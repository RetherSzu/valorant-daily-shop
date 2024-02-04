import { createContext } from "react";
// type
import { IAuthContext } from "@/type/context/auth";

// ----------------------------------------

export const initialAuthState: IAuthContext = {
    // fn
    login: (_username, _password) => Promise.resolve(),
    logout: () => Promise.resolve(),
    // states
    isLoading: false,
    isSignout: false,
    accessToken: null,
    entitlementsToken: null,
    // user info
    balance: {
        radianitePoint: "0",
        valorantPoint: "0",
        kingdomCredit: "0"
    },
    // shop
    shop: {
        offers: {
            SingleItemOffers: [],
            SingleItemStoreOffers: [],
            SingleItemOffersRemainingDurationInSeconds: 0
        },
        bundles: ""
    }
};

export const AuthContext = createContext<IAuthContext>(initialAuthState);
