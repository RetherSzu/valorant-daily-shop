import { ReactNode, useCallback, useEffect, useMemo, useReducer } from "react";
// type
import { EAuthContextType, IAuthContext, IAuthAction } from "@/type/context/auth";
//
import { AuthContext, initialAuthState } from "./auth-context";

const reducer = (state: IAuthContext, action: IAuthAction<EAuthContextType>) => {
    switch (action.type) {
        case EAuthContextType.INITIAL:
            return {
                ...state,
                loading: true,
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
        try {
            const currentUser = localStorage.getItem("user");
            if (currentUser) {
                dispatch({
                    type: EAuthContextType.INITIAL,
                    payload: {
                        user: null,
                    },
                });
            } else {
                dispatch({
                    type: EAuthContextType.INITIAL,
                    payload: {
                        user: null,
                    },
                });
            }
        } catch (error) {
            console.error(error);
            dispatch({
                type: EAuthContextType.INITIAL,
                payload: {
                    user: null,
                },
            });
        }
    }, []);

    useEffect(() => {
        (async () => initialize())();
    }, []);

    const memoizedValue = useMemo(
        () => ({
            isLoading: state.isLoading,
            isSignout: state.isSignout,
            accessToken: state.accessToken,
            entitlementToken: state.entitlementToken,
            //
            login: (_username: string, _password: string) => Promise.resolve(),
        }),
        [
            state.isLoading,
            state.isSignout,
        ]
    );

    return (
        <AuthContext.Provider value={memoizedValue}>
            {children}
        </AuthContext.Provider>
    );
}
