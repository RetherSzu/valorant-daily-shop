import { createContext } from "react";
// types
import { IAuthContext } from "@/types/context/auth";

// ----------------------------------------

export const initialAuthState: IAuthContext = {
    // fn
    login: () => Promise.resolve(),
    logoutUser: () => Promise.resolve(),
    dispatch: () => {},
    // states
    isLoading: false,
    isSignout: false,
    isInitialized: false,
    currentUser: null,
};

export const AuthContext = createContext<IAuthContext>(initialAuthState);
