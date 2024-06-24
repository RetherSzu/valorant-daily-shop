export type PlayerLoadoutResponse = {
    /** Player UUID */
    Subject: string;
    Version: number;
    Guns: PlayerLoadoutGuns;
    Sprays: PlayerLoadoutSprays;
    Identity: Identity
    Incognito: boolean;
};

export type PlayerLoadout = {
    /** Player UUID */
    Subject: string;
    Version: number;
    Guns: { title: string, data: PlayerLoadoutGuns }[];
    Sprays: PlayerLoadoutSprays;
    Identity: Identity
    Incognito: boolean;
};

type Identity = {
    /** UUID */
    PlayerCardID: string;
    /** UUID */
    PlayerTitleID: string;
    AccountLevel: number;
    /** UUID */
    PreferredLevelBorderID: string;
    HideAccountLevel: boolean;
};


export type PlayerLoadoutGun = {
    /** UUID */
    ID: string;
    /** UUID */
    CharmInstanceID?: string | undefined;
    /** UUID */
    CharmID?: string | undefined;
    /** UUID */
    CharmLevelID?: string | undefined;
    /** UUID */
    SkinID: string;
    /** UUID */
    SkinLevelID: string;
    /** UUID */
    ChromaID: string;
    Attachments: unknown[];
};

export type PlayerLoadoutGuns = PlayerLoadoutGun[];

export type PlayerLoadoutSpray = {
    /** UUID */
    ID: string;
    /** UUID */
    SprayID: string;
    /** UUID */
    SprayLevelID: string;
};

export type PlayerLoadoutSprays = PlayerLoadoutSpray[];
