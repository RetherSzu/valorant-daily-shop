import { createContext } from "react";
// types
import { INightMarketContext } from "@/types/context/night-market";

// ----------------------------------------------------------

export const initialNightMarketState: INightMarketContext = {
    nightMarket: undefined,
    setNightMarket: () => {},
};

// ----------------------------------------------------------

export const NightMarketContext = createContext(initialNightMarketState);
