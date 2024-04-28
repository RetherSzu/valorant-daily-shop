// type
import { SkinsPanelLayout } from "@/type/api/shop/dayli-shop";

export type IDailyShopContext = {
    dailyShop: SkinsPanelLayout;
    setDailyShop: (dailyShop: SkinsPanelLayout) => void;
}

export enum EDailyShopContextType {
    DECREMENT_TIMER = "DECREMENT_TIMER",
    SET_DAILY_SHOP = "SET_DAILY_SHOP",
}

export type IPayloadDailyShop = {
    [EDailyShopContextType.DECREMENT_TIMER]: {};
    [EDailyShopContextType.SET_DAILY_SHOP]: {
        dailyShop: SkinsPanelLayout
    };
};

export type IDailyShopAction<T extends EDailyShopContextType> = {
    type: T;
    payload: IPayloadDailyShop[T];
}
