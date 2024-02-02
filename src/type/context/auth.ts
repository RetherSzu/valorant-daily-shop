export type IAuthContext = {
    // fn
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    // state
    isLoading: boolean;
    isSignout: boolean;
    accessToken: string | null;
    entitlementsToken: string | null;
    // user info
    balance: {
        radianitePoint: string;
        valorantPoint: string;
        kingdomCredit: string;
    };
}

export enum EAuthContextType {
    INITIAL = "INITIAL",
    SET_TOKEN = "SET_TOKEN",
    LOGOUT = "LOGOUT",
    SET_BALANCE = "SET_BALANCE",
}

export type IPayloadAuth = {
    [EAuthContextType.INITIAL]: {
        accessToken: string | null;
        entitlementsToken: string | null;
        radianitePoint: string;
        valorantPoint: string;
        kingdomCredit: string;
    };
    [EAuthContextType.SET_TOKEN]: {
        accessToken: string | null;
        entitlementsToken: string | null;
    };
    [EAuthContextType.LOGOUT]: {};
    [EAuthContextType.SET_BALANCE]: {
        radianitePoint: string;
        valorantPoint: string;
        kingdomCredit: string;
    };
};

export type IAuthAction<T extends EAuthContextType> = {
    type: T;
    payload: IPayloadAuth[T];
}
