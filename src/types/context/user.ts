export type IUserContext = {
    gameName: string | null;
    tagLine: string | null;
    sub: string | null;
    pp: string | null;
    balance: {
        radianitePoint:string | null;
        valorantPoint: string | null;
        kingdomCredit: string | null;
    };
    initialize: () => Promise<void>;
}

export enum EUserContextType {
    INITIAL = "INITIAL",
}

export type IPayloadUser = {
    [EUserContextType.INITIAL]: {
        gameName: string | null;
        tagLine: string | null;
        sub: string | null;
        pp: string | null;
        balance: {
            radianitePoint: string | null;
            valorantPoint: string | null;
            kingdomCredit: string | null;
        };
    };
};

export type IUserAction<T extends EUserContextType> = {
    type: T;
    payload: IPayloadUser[T];
}
