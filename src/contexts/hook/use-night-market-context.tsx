import { useContext } from "react";
//
import { NightMarketContext } from "@/contexts/night-market/night-market-context";

const useNightMarketContext = () => {
    const context = useContext(NightMarketContext);

    if (!context) throw new Error("useNightMarketContext context must be use inside NightMarketProvider");

    return context;
};

export default useNightMarketContext;
