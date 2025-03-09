import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReactNode, useCallback, useEffect, useMemo, useReducer } from "react";
// api
import valorantProvider from "@/api/valorant-provider";
// auth
import authLogic from "@/auth/auth-logic";
// types
import { EAuthContextType, IAuthAction, IAuthContext } from "@/types/context/auth";
// utils
import user from "@/utils/users";
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
        dispatch({
            type: EAuthContextType.INITIAL,
            payload: {
                currentUser: null,
            },
        });
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

            // Account XP
            await valorantProvider.getAccountXP();

            // Get player loadout
            await valorantProvider.getPlayerLoadout();

            // Get player rank and rr
            await valorantProvider.getPlayerRankAndRR();

            // Set current user to auth provider
            const currentUser = await AsyncStorage.getItem("current_user");

            dispatch({
                type: EAuthContextType.INITIAL,
                payload: {
                    currentUser: currentUser,
                },
            });

            return Promise.resolve();
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const logoutUser = async (username: string): Promise<void> => {
        if (!username) {
            return;
        }

        await user.removeUser(username);
    };

    useEffect(() => {
        (async () => initialize())();
    }, []);

    const memoizedValue = useMemo(
        () => ({
            isLoading: state.isLoading,
            isSignout: state.isSignout,
            isInitialized: state.isInitialized,
            currentUser: state.currentUser,
            //
            login,
            logoutUser,
            dispatch,
        }),
        [
            state,
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
