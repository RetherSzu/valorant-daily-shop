export type AccountXPResponse = {
    Version: number;
    /** Player UUID */
    Subject: string;
    Progress: {
        Level: number;
        XP: number;
    };
    History: {
        /** Match ID */
        ID: string;
        /** Date in ISO 8601 format */
        MatchStart: string;
        StartProgress: {
            Level: number;
            XP: number;
        };
        EndProgress: {
            Level: number;
            XP: number;
        };
        XPDelta: number;
        XPSources: {
            ID: "time-played" | "match-win" | "first-win-of-the-day";
            Amount: number;
        }[];
        XPMultipliers: unknown[];
    }[];
    /** Date in ISO 8601 format */
    LastTimeGrantedFirstWin: string;
    /** Date in ISO 8601 format */
    NextTimeFirstWinAvailable: string;
};
