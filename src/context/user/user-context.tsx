import { createContext } from "react";
// type
import { IUserContext } from "@/type/context/user";

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
