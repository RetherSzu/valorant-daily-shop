import { ReactNode, useEffect, useMemo, useReducer } from "react";
// types
import { SkinsPanelLayout } from "@/types/api/shop/dayli-shop";
import { EDailyShopContextType, IDailyShopAction, IDailyShopContext } from "@/types/context/daily-shop";
//
import { DailyShopContext, initialDailyShopState } from "./daily-shop-context";

const reducer = (state: IDailyShopContext, action: IDailyShopAction<EDailyShopContextType>) => {
    let ac;

    switch (action.type) {
        case EDailyShopContextType.SET_DAILY_SHOP:
            ac = action as IDailyShopAction<EDailyShopContextType.SET_DAILY_SHOP>;
            return {
                ...state,
                dailyShop: ac.payload.dailyShop,
            };
        case EDailyShopContextType.DECREMENT_TIMER:
            return {
                ...state,
                dailyShop: {
                    ...state.dailyShop,
                    SingleItemOffersRemainingDurationInSeconds: state.dailyShop.SingleItemOffersRemainingDurationInSeconds - 1,
                },
            };
        default:
            return state;
    }
};

type DailyShopProviderProps = {
    children: ReactNode;
};

const DailyShopProvider = ({ children }: DailyShopProviderProps) => {

    const [state, dispatch] = useReducer(reducer, initialDailyShopState);

    const setDailyShop = (dailyShop: SkinsPanelLayout) => {
        dispatch({
            type: EDailyShopContextType.SET_DAILY_SHOP,
            payload: { dailyShop },
        });
    };

    useEffect(() => {

        if (!state.dailyShop) return;

        const timer = setInterval(() => {
            dispatch({ type: EDailyShopContextType.DECREMENT_TIMER, payload: {} });
        }, 1000);

        return () => clearInterval(timer); // cleanup on component unmount
    }, [dispatch]);

    const memoizedValue = useMemo(
        () => ({
            ...state,
            setDailyShop,
        }),
        [state],
    );

    return (
        <DailyShopContext.Provider value={memoizedValue}>
            {children}
        </DailyShopContext.Provider>
    );
};

export default DailyShopProvider;
