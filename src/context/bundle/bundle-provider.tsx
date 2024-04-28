import { ReactNode, useEffect, useMemo, useReducer } from "react";
// type
import { EBundleContextType, IBundleAction, IBundleContext } from "@/type/context/bundle";
//
import { BundleContext, initialBundleState } from "./bundle-context";
import { FeaturedBundle } from "@/type/api/shop/bundle";

const reducer = (state: IBundleContext, action: IBundleAction<EBundleContextType>) => {
    let ac;

    switch (action.type) {
        case EBundleContextType.SET_BUNDLES:
            ac = action as IBundleAction<EBundleContextType.SET_BUNDLES>;
            return {
                ...state,
                bundles: ac.payload.bundles,
            };
        case EBundleContextType.DECREMENT_TIMER:
            if (!state.bundles) return state;

            return {
                ...state,
                bundles: {
                    ...state.bundles,
                    Bundles: state.bundles.Bundles.map((bundle) => {
                        return {
                            ...bundle,
                            DurationRemainingInSeconds: bundle.DurationRemainingInSeconds - 1,
                        };
                    }),
                },
            };
        default:
            return state;
    }
};

type BundleProviderProps = {
    children: ReactNode;
};

const BundleProvider = ({ children }: BundleProviderProps) => {

    const [state, dispatch] = useReducer(reducer, initialBundleState);

    const setBundles = (bundles: FeaturedBundle) => {
        dispatch({
            type: EBundleContextType.SET_BUNDLES,
            payload: { bundles },
        });
    };

    useEffect(() => {
        if (!state.bundles) return;

        const timer = setInterval(() => {
            dispatch({ type: EBundleContextType.DECREMENT_TIMER, payload: {} });
        }, 1000);

        return () => clearInterval(timer); // cleanup on component unmount
    }, [dispatch]);

    const memoizedValue = useMemo(
        () => ({
            ...state,
            setBundles,
        }),
        [state],
    );

    return (
        <BundleContext.Provider value={memoizedValue}>
            {children}
        </BundleContext.Provider>
    );
};

export default BundleProvider;
