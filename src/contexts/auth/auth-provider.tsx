import * as SecureStore from "expo-secure-store";
import { ReactNode, useCallback, useEffect, useMemo, useReducer } from "react";
// api
import valorantProvider from "@/api/valorant-provider";
// auth
import authLogic from "@/auth/auth-logic";
// controllers
import { resetStore } from "@/controllers/store";
// types
import { EAuthContextType, IAuthAction, IAuthContext } from "@/types/context/auth";
// utils
import { clearSecureStore } from "@/utils/secure-store";
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
                isInitialized: true,
            };
        case EAuthContextType.SET_TOKEN:
            ac = action as IAuthAction<EAuthContextType.SET_TOKEN>;

            return {
                ...state,
                accessToken: ac.payload.accessToken,
                entitlementsToken: ac.payload.entitlementsToken,
            };
        case EAuthContextType.LOGOUT:
            return {
                ...initialAuthState,
                isSignout: true,
                isInitialized: true,
            };
        default:
            return state;
    }
};

// ----------------------------------------------------------------------

type AuthProviderProps = {
    children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialAuthState);

    const initialize = useCallback(async () => {

        const [
            accessToken,
            entitlementsToken,
        ] = await Promise.all([
            SecureStore.getItemAsync("access_token"),
            SecureStore.getItemAsync("entitlements_token"),
        ]);

        try {
            dispatch({
                type: EAuthContextType.INITIAL,
                payload: {
                    accessToken,
                    entitlementsToken,
                },
            });

        } catch (error) {
            dispatch({
                type: EAuthContextType.INITIAL, payload: {
                    accessToken: null,
                    entitlementsToken: null,
                },
            });
        }
    }, []);

    const login = async () => {
        try {
            // Get entitlement token
            await authLogic.getEntitlement();

            // Get user info
            await valorantProvider.getUserInfo();

            // Get riot geo: PP
            await valorantProvider.getRiotGeo();

            // Get riot version
            await valorantProvider.getRiotVersion();

            // Get user balance
            await valorantProvider.getUserBalance();

            const accessToken = SecureStore.getItem("access_token");
            const entitlementsToken = SecureStore.getItem("entitlements_token");

            dispatch({
                type: EAuthContextType.SET_TOKEN,
                payload: {
                    accessToken,
                    entitlementsToken,
                },
            });

            return Promise.resolve();
        } catch (error) {
            dispatch({ type: EAuthContextType.LOGOUT, payload: {} });
            throw error;
        }
    };

    const logout = async () => {

        dispatch({ type: EAuthContextType.LOGOUT, payload: {} });

        resetStore();

        await clearSecureStore();
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
            isInitialized: state.isInitialized,
            //
            login,
            logout,
        }),
        [
            state,
            state.accessToken,
            state.entitlementsToken,
            state.isLoading,
            state.isSignout,
        ],
    );

    return (
        <AuthContext.Provider value={memoizedValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
