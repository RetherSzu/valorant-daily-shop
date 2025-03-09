export type IUserContext = {
    gameName: string | null;
    tagLine: string | null;
    sub: string | null;
    pp: string | null;
    balance: {
        radianitePoint: string | null;
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

export type IUserData = {
    stay_sign_in: string | null,
    access_token: string | null,
    id_token: string | null,
    entitlements_token: string | null,
    sub: string | null,
    tdid: string | null,
    asid: string | null,
    clid: string | null,
    ssid: string | null,
    game_name: string | null,
    tag_line: string | null,
    pp: string | null,
    radianite_point: string | null,
    valorant_point: string | null,
    kingdom_credit: string | null,
    logged: boolean,
    rank: string | null,
    rr: string | null,
    level: string | null,
    xp: string | null,
    player_card_id: string | null,
}

export type IUsersData = {
    [key: string]: IUserData
}
