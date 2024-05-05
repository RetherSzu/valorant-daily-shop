// types
import { BonusStore } from "@/types/api/shop/night-market";

export type INightMarketContext = {
    nightMarket?: BonusStore;
    setNightMarket: (nightMarket: BonusStore) => void;
}

export enum ENightMarketContextType {
    DECREMENT_TIMER = "DECREMENT_TIMER",
    SET_NIGHT_MARKET = "SET_NIGHT_MARKET",
}

export type INightMarketShop = {
    [ENightMarketContextType.DECREMENT_TIMER]: {};
    [ENightMarketContextType.SET_NIGHT_MARKET]: {
        nightMarket: BonusStore
    };
};

export type INightMarketAction<T extends ENightMarketContextType> = {
    type: T;
    payload: INightMarketShop[T];
}
