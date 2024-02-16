import * as SecureStore from "expo-secure-store";
import { ReactNode, useCallback, useEffect, useMemo, useReducer } from "react";
// api
import valorantProvider from "@/api/valorant-provider";
// auth
import authLogic from "@/auth/auth-logic";
import { useNavigation } from "@react-navigation/native";
// type
import { EAuthContextType, IAuthAction, IAuthContext } from "@/type/context/auth";
//
import { AuthContext, initialAuthState } from "./auth-context";

const reducer = (state: IAuthContext, action: IAuthAction<EAuthContextType>) => {
    let ac;

    switch (action.type) {
        case EAuthContextType.INITIAL:
            ac = action as IAuthAction<EAuthContextType.INITIAL>;

            return {
                ...state,
                ...ac.payload,
                isInitialized: true
            };
        case EAuthContextType.SET_TOKEN:
            ac = action as IAuthAction<EAuthContextType.SET_TOKEN>;

            return {
                ...state,
                accessToken: ac.payload.accessToken,
                entitlementsToken: ac.payload.entitlementsToken
            };
        case EAuthContextType.LOGOUT:
            return {
                ...state,
                accessToken: null,
                entitlementsToken: null
            };
        case EAuthContextType.SET_BALANCE:
            ac = action as IAuthAction<EAuthContextType.SET_BALANCE>;

            return {
                ...state,
                balance: ac.payload
            };
        case EAuthContextType.SET_SHOP:
            ac = action as IAuthAction<EAuthContextType.SET_SHOP>;

            return {
                ...state,
                shop: ac.payload
            };
        case EAuthContextType.DECREMENT_TIMER:
            return {
                ...state,
                shop: {
                    ...state.shop,
                    offers: {
                        ...state.shop.offers,
                        SingleItemOffersRemainingDurationInSeconds: state.shop.offers.SingleItemOffersRemainingDurationInSeconds - 1
                    },
                    bundles: {
                        ...state.shop.bundles,
                        Bundles: state.shop.bundles.Bundles.map((bundle) => {
                            return {
                                ...bundle,
                                DurationRemainingInSeconds: bundle.DurationRemainingInSeconds - 1
                            };
                        })
                    },
                    nightMarket: {
                        ...state.shop.nightMarket,
                        BonusStoreRemainingDurationInSeconds: state.shop.nightMarket?.BonusStoreRemainingDurationInSeconds ? state.shop.nightMarket.BonusStoreRemainingDurationInSeconds - 1 : 0
                    }
                }
            };
        default:
            return state;
    }
};

// ----------------------------------------------------------------------

type Props = {
    children: ReactNode;
};

export function AuthProvider({ children }: Props) {
    const [state, dispatch] = useReducer(reducer, initialAuthState);

    const navigation = useNavigation();

    const initialize = useCallback(async () => {

        const [
            accessToken,
            entitlementsToken,
            radianitePoint,
            valorantPoint,
            kingdomCredit
        ] = await Promise.all([
            SecureStore.getItemAsync("access_token"),
            SecureStore.getItemAsync("entitlements_token"),
            SecureStore.getItemAsync("radianite_point"),
            SecureStore.getItemAsync("valorant_point"),
            SecureStore.getItemAsync("kingdom_credit")
        ]);

        try {
            if (!accessToken && !entitlementsToken) return;

            const shop = await valorantProvider.getFrontShop();

            dispatch({
                type: EAuthContextType.INITIAL,
                payload: {
                    accessToken,
                    entitlementsToken,
                    balance: {
                        radianitePoint,
                        valorantPoint,
                        kingdomCredit
                    },
                    shop
                }
            });

        } catch (error) {
            const username = await SecureStore.getItemAsync("username");
            const password = await SecureStore.getItemAsync("password");

            if (username && password) {
                await login(username, password);
            }

            console.error(error);
        }
    }, []);

    const login = async (username: string, password: string) => {

        const cookies = await authLogic.authCookie();

        if (cookies["ssid"] != "") {
            await authLogic.cookieReauth();
        } else {
            const multifactor = await authLogic.getToken(username, password);

            if (multifactor) {
                navigation.navigate("Multifactor");
                return;
            }
        }

        await authLogic.getEntitlement();

        const accessToken = SecureStore.getItem("access_token");
        const entitlementsToken = SecureStore.getItem("entitlements_token");

        dispatch({
            type: EAuthContextType.SET_TOKEN,
            payload: {
                accessToken,
                entitlementsToken
            }
        });

        await valorantProvider.getUserInfo();

        const balance = await valorantProvider.getUserBalance();

        dispatch({ type: EAuthContextType.SET_BALANCE, payload: balance });

        const shop = await valorantProvider.getFrontShop();

        if (!shop) return;

        dispatch({ type: EAuthContextType.SET_SHOP, payload: shop });

        return Promise.resolve();
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync("username");
        await SecureStore.deleteItemAsync("password");
        await SecureStore.deleteItemAsync("stay_sign_in");
        await SecureStore.deleteItemAsync("access_token");
        await SecureStore.deleteItemAsync("entitlements_token");
        await SecureStore.deleteItemAsync("sub");
        await SecureStore.deleteItemAsync("tdid");
        await SecureStore.deleteItemAsync("asid");
        await SecureStore.deleteItemAsync("clid");
        await SecureStore.deleteItemAsync("ssid");

        dispatch({ type: EAuthContextType.LOGOUT, payload: {} });
    };

    useEffect(() => {
        (async () => initialize())();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            dispatch({ type: EAuthContextType.DECREMENT_TIMER, payload: {} });
        }, 1000);

        return () => clearInterval(timer); // cleanup on component unmount
    }, [dispatch]);

    const memoizedValue = useMemo(
        () => ({
            isLoading: state.isLoading,
            isSignout: state.isSignout,
            accessToken: state.accessToken,
            entitlementsToken: state.entitlementsToken,
            isInitialized: state.isInitialized,
            // user info
            balance: state.balance,
            // shop
            shop: state.shop,
            //
            login,
            logout
        }),
        [
            state,
            state.isLoading,
            state.isSignout
        ]
    );

    return (
        <AuthContext.Provider value={memoizedValue}>
            {children}
        </AuthContext.Provider>
    );
}
