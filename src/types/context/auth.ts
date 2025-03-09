import React from "react";

export type IAuthContext = {
    // fn
    login: () => Promise<void>;
    logoutUser: (user: string) => Promise<void>;
    dispatch: React.Dispatch<IAuthAction<EAuthContextType>>;
    // state
    isLoading: boolean;
    isSignout: boolean;
    currentUser: string | null;
    isInitialized: boolean;
}

export enum EAuthContextType {
    INITIAL = "INITIAL",
    LOGOUT = "LOGOUT",
}

export type IPayloadAuth = {
    [EAuthContextType.INITIAL]: {
        currentUser: string | null;
    };
    [EAuthContextType.LOGOUT]: {};
};

export type IAuthAction<T extends EAuthContextType> = {
    type: T;
    payload: IPayloadAuth[T];
}
