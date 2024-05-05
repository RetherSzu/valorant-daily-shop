import { createContext } from "react";
// types
import { IAccessoryStoreContext } from "@/types/context/accessory-store";

// ----------------------------------------

export const initialAccessoryStoreState: IAccessoryStoreContext = {
    accessoryStore: {
        AccessoryStoreOffers: [],
        AccessoryStoreRemainingDurationInSeconds: 0,
        StorefrontID: "",
    },
    setAccessoryStore: () => {},
};

export const AccessoryStoreContext = createContext<IAccessoryStoreContext>(initialAccessoryStoreState);
