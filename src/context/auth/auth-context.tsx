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
    isInitialized: false,
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
        bundles: {
            Bundles: [],
            Bundle: undefined,
            BundleRemainingDurationInSeconds: 0
        },
        nightMarket: undefined
    }
};

export const AuthContext = createContext<IAuthContext>(initialAuthState);
