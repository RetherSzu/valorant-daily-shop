import { createContext } from "react";
// types
import { IAuthContext } from "@/types/context/auth";

// ----------------------------------------

export const initialAuthState: IAuthContext = {
    // fn
    login: (_username, _password) => Promise.resolve(),
    logout: () => Promise.resolve(),
    // states
    isLoading: false,
    isSignout: false,
    accessToken: null,
    entitlementsToken: null,
    isInitialized: false,
};

export const AuthContext = createContext<IAuthContext>(initialAuthState);
