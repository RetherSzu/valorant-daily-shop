import { createContext } from "react";
// type
import { IDailyShopContext } from "@/type/context/daily-shop";

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
