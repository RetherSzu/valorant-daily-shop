export type IAuthContext = {
    // fn
    login: (username: string, password: string) => Promise<void>;
    // state
    isLoading: boolean;
    isSignout: boolean;
    accessToken: string | null;
    entitlementToken: string | null;
}

export enum EAuthContextType {
    INITIAL = "INITIAL",
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
}

export type IPayloadAuth = {
    [EAuthContextType.INITIAL]: {
        user: any;
    };
    [EAuthContextType.LOGIN]: {
        accessToken: string;
        entitlementToken: string;
    };
    [EAuthContextType.LOGOUT]: undefined;
};

export type IAuthAction<T extends EAuthContextType> = {
    type: T;
    payload: IPayloadAuth[T];
}
