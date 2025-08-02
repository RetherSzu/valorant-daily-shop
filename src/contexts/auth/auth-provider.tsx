import Toast from "react-native-toast-message";
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

    const reauthWithCookie = async (ssidCookie: string) => {
        try {
            // Store the SSID cookie
            await AsyncStorage.setItem('ssid_cookie', ssidCookie);

            // Attempt to reauth using the cookie
            const reauthUrl = 'https://auth.riotgames.com/authorize?redirect_uri=https%3A%2F%2Fplayvalorant.com%2Fopt_in&client_id=play-valorant-web-prod&response_type=token%20id_token&nonce=1&scope=account%20openid';
            
            const response = await fetch(reauthUrl, {
                headers: {
                    'Cookie': `ssid=${ssidCookie}`
                }
            });

            if (!response.ok) {
                throw new Error('Reauth failed');
            }

            // Extract tokens from the redirect URL
            const redirectUrl = response.url;
            const urlParams = new URLSearchParams(redirectUrl.split('#')[1]);
            const accessToken = urlParams.get('access_token');
            const idToken = urlParams.get('id_token');

            if (!accessToken || !idToken) {
                throw new Error('Failed to extract tokens from reauth response');
            }

            // Store the tokens
            await AsyncStorage.setItem('access_token', accessToken);
            await AsyncStorage.setItem('id_token', idToken);

            return { accessToken, idToken };
        } catch (error: any) {
            console.error('Reauth error:', error);
            Toast.show({
                type: 'error',
                text1: 'Reauth Failed',
                text2: 'Failed to refresh authentication. Please login again.',
                position: 'bottom',
            });
            throw error;
        }
    };

    const login = async (ssidCookie?: string) => {
        try {
            // If SSID cookie is provided, try to reauth first
            if (ssidCookie) {
                await reauthWithCookie(ssidCookie);
            }

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

            Toast.show({
                type: 'success',
                text1: 'Login Successful',
                text2: 'Welcome back!',
                position: 'bottom',
            });

            return Promise.resolve();
        } catch (error: any) {
            console.error('Login error:', error);
            
            // Handle specific error types
            if (error.response) {
                // API error with response
                const status = error.response.status;
                const message = error.response.data?.message || 'An error occurred during login';
                
                switch (status) {
                    case 401:
                        Toast.show({
                            type: 'error',
                            text1: 'Authentication Failed',
                            text2: 'Invalid credentials. Please try again.',
                            position: 'bottom',
                        });
                        break;
                    case 403:
                        Toast.show({
                            type: 'error',
                            text1: 'Access Denied',
                            text2: 'You do not have permission to access this account.',
                            position: 'bottom',
                        });
                        break;
                    case 429:
                        Toast.show({
                            type: 'error',
                            text1: 'Too Many Requests',
                            text2: 'Please wait a moment before trying again.',
                            position: 'bottom',
                        });
                        break;
                    default:
                        Toast.show({
                            type: 'error',
                            text1: 'Login Failed',
                            text2: message,
                            position: 'bottom',
                        });
                }
            } else if (error.request) {
                // Network error
                Toast.show({
                    type: 'error',
                    text1: 'Network Error',
                    text2: 'Please check your internet connection and try again.',
                    position: 'bottom',
                });
            } else {
                // Other errors
                Toast.show({
                    type: 'error',
                    text1: 'Login Error',
                    text2: error.message || 'An unexpected error occurred',
                    position: 'bottom',
                });
            }
            
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
