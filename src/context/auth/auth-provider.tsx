import * as SecureStore from "expo-secure-store";
import { ReactNode, useCallback, useEffect, useMemo, useReducer } from "react";
// api
import valorantProvider from "@/api/valorant-provider";
// auth
import authLogic from "@/auth/auth-logic";
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
                ...ac.payload
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

    const initialize = useCallback(async () => {

        const [accessToken,
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


        if (accessToken && entitlementsToken) {
            dispatch({
                type: EAuthContextType.INITIAL,
                payload: {
                    accessToken,
                    entitlementsToken,
                    radianitePoint,
                    valorantPoint,
                    kingdomCredit
                }
            });
        }

    }, []);

    const login = async (username: string, password: string) => {

        const cookies = await authLogic.authCookie();

        if (cookies["ssid"] != "") {
            await authLogic.cookieReauth();
        } else {
            await authLogic.getToken(username, password);
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
        console.log("login success", accessToken, entitlementsToken);

        await valorantProvider.getUserInfo();

        const balance = await valorantProvider.getUserBalance();

        console.log(balance);

        dispatch({ type: EAuthContextType.SET_BALANCE, payload: balance });

        return Promise.resolve();
    };

    const logout = async () => {
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

    const memoizedValue = useMemo(
        () => ({
            isLoading: state.isLoading,
            isSignout: state.isSignout,
            accessToken: state.accessToken,
            entitlementsToken: state.entitlementsToken,
            // user info
            balance: state.balance,
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
