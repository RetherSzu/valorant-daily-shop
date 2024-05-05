import { createContext } from "react";
// types
import { IDailyShopContext } from "@/types/context/daily-shop";

// ----------------------------------------------------------

export const initialDailyShopState: IDailyShopContext = {
    dailyShop: {
        SingleItemOffers: [],
        SingleItemStoreOffers: [],
        SingleItemOffersRemainingDurationInSeconds: 0
    },
    setDailyShop: () => {}
};

// ----------------------------------------------------------

export const DailyShopContext = createContext(initialDailyShopState);
