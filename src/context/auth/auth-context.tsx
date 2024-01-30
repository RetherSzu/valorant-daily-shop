import { createContext } from "react";
// type
import { IAuthContext } from "@/type/context/auth";

// ----------------------------------------

export const initialAuthState: IAuthContext = {
    // fn
    login: (_username, _password) => Promise.resolve(),
    // states
    isLoading: false,
    isSignout: false,
    accessToken: null,
    entitlementToken: null,
};

export const AuthContext = createContext<IAuthContext>(initialAuthState);
