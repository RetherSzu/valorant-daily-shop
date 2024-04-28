import { ReactNode, useEffect, useMemo, useReducer } from "react";
// type
import { BonusStore } from "@/type/api/shop/night-market";
import { ENightMarketContextType, INightMarketAction, INightMarketContext } from "@/type/context/night-market";
//
import { initialNightMarketState, NightMarketContext } from "./night-market-context";

const reducer = (state: INightMarketContext, action: INightMarketAction<ENightMarketContextType>) => {
    let ac;

    switch (action.type) {
        case ENightMarketContextType.SET_NIGHT_MARKET:
            ac = action as INightMarketAction<ENightMarketContextType.SET_NIGHT_MARKET>;
            return {
                ...state,
                nightMarket: ac.payload.nightMarket,
            };
        case ENightMarketContextType.DECREMENT_TIMER:
            if (!state.nightMarket) return state;

            return {
                ...state,
                nightMarket: {
                    ...state.nightMarket,
                    BonusStoreRemainingDurationInSeconds: state.nightMarket.BonusStoreRemainingDurationInSeconds - 1,
                },
            };
        default:
            return state;
    }
};

type NightMarketProviderProps = {
    children: ReactNode;
};

const NightMarketProvider = ({ children }: NightMarketProviderProps) => {

    const [state, dispatch] = useReducer(reducer, initialNightMarketState);

    const setNightMarket = (nightMarket: BonusStore) => {
        dispatch({
            type: ENightMarketContextType.SET_NIGHT_MARKET,
            payload: { nightMarket },
        });
    };

    useEffect(() => {
        const timer = setInterval(() => {
            dispatch({ type: ENightMarketContextType.DECREMENT_TIMER, payload: {} });
        }, 1000);

        return () => clearInterval(timer); // cleanup on component unmount
    }, [dispatch]);

    const memoizedValue = useMemo(
        () => ({
            ...state,
            setNightMarket,
        }),
        [state],
    );

    return (
        <NightMarketContext.Provider value={memoizedValue}>
            {children}
        </NightMarketContext.Provider>
    );
};

export default NightMarketProvider;
