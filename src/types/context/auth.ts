export type IAuthContext = {
    // fn
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    // state
    isLoading: boolean;
    isSignout: boolean;
    accessToken: string | null;
    entitlementsToken: string | null;
    isInitialized: boolean;
}

export enum EAuthContextType {
    INITIAL = "INITIAL",
    SET_TOKEN = "SET_TOKEN",
    LOGOUT = "LOGOUT",
}

export type IPayloadAuth = {
    [EAuthContextType.INITIAL]: {
        accessToken: string | null;
        entitlementsToken: string | null;
    };
    [EAuthContextType.SET_TOKEN]: {
        accessToken: string | null;
        entitlementsToken: string | null;
    };
    [EAuthContextType.LOGOUT]: {};
};

export type IAuthAction<T extends EAuthContextType> = {
    type: T;
    payload: IPayloadAuth[T];
}
