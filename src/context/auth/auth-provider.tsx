import * as SecureStore from "expo-secure-store";
import { ReactNode, useCallback, useEffect, useMemo, useReducer } from "react";
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
                accessToken: ac.payload.accessToken,
                entitlementsToken: ac.payload.entitlementsToken
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
        const accessToken = await SecureStore.getItemAsync("access_token");
        const entitlementsToken = await SecureStore.getItemAsync("entitlements_token");

        if (accessToken && entitlementsToken) {
            dispatch({
                type: EAuthContextType.INITIAL,
                payload: {
                    accessToken,
                    entitlementsToken
                }
            });
        }

    }, []);

    const login = async (username: string, password: string) => {

        const cookies = await authLogic.authCookie();

        if (cookies["ssid"] != "") {
            await authLogic.cookieReauth();
        } else {
            const token = await authLogic.getToken(username, password);

            if (!token) return;
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
