import { createContext } from "react";
// type
import { INightMarketContext } from "@/type/context/night-market";

// ----------------------------------------------------------

export const initialNightMarketState: INightMarketContext = {
    nightMarket: undefined,
    setNightMarket: () => {},
};

// ----------------------------------------------------------

export const NightMarketContext = createContext(initialNightMarketState);
