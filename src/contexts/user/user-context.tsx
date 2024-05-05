import { createContext } from "react";
// types
import { IUserContext } from "@/types/context/user";

// ----------------------------------------

export const initialUserState: IUserContext = {
    gameName: "",
    tagLine: "",
    sub: "",
    pp: "",
    // user
    balance: {
        radianitePoint: "0",
        valorantPoint: "0",
        kingdomCredit: "0",
    },
    // fn
    initialize: async () => Promise.resolve(),
};

export const UserContext = createContext<IUserContext>(initialUserState);
