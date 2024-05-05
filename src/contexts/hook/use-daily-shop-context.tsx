import { useContext } from "react";
//
import { DailyShopContext } from "../daily-shop/daily-shop-context";

const useDailyShopContext = () => {
    const context = useContext(DailyShopContext);

    if (!context) throw new Error("useDailyShopContext context must be use inside DailyShopProvider");

    return context;
};

export default useDailyShopContext;
