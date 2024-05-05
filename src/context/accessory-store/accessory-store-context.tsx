import { createContext } from "react";
// type
import { IAccessoryStoreContext } from "@/type/context/accessory-store";

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
