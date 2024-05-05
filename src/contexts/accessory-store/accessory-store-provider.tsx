import { ReactNode, useEffect, useMemo, useReducer } from "react";
// types
import {
    EAccessoryStoreContextType,
    IAccessoryStoreAction,
    IAccessoryStoreContext,
} from "@/types/context/accessory-store";
import { AccessoryStore } from "@/types/api/shop/accessory-store";
//
import { AccessoryStoreContext, initialAccessoryStoreState } from "./accessory-store-context";

const reducer = (state: IAccessoryStoreContext, action: IAccessoryStoreAction<EAccessoryStoreContextType>) => {
    let ac;

    switch (action.type) {
        case EAccessoryStoreContextType.SET_ACCESSORY_STORE:
            ac = action as IAccessoryStoreAction<EAccessoryStoreContextType.SET_ACCESSORY_STORE>;

            return {
                ...state,
                ...ac.payload,
            };
        case EAccessoryStoreContextType.DECREMENT_TIMER:
            return {
                ...state,
                accessoryStore: {
                    ...state.accessoryStore,
                    AccessoryStoreRemainingDurationInSeconds: state.accessoryStore.AccessoryStoreRemainingDurationInSeconds - 1,
                },
            };
        default:
            return state;
    }
};

// ----------------------------------------------------------------------

type AccessoryStoreProviderProps = {
    children: ReactNode;
};

const AccessoryStoreProvider = ({ children }: AccessoryStoreProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialAccessoryStoreState);

    const setAccessoryStore = (accessoryStore: AccessoryStore) => {
        dispatch({
            type: EAccessoryStoreContextType.SET_ACCESSORY_STORE,
            payload: { accessoryStore },
        });
    };

    useEffect(() => {

        if (!state.accessoryStore) return;

        const timer = setInterval(() => {
            dispatch({ type: EAccessoryStoreContextType.DECREMENT_TIMER, payload: {} });
        }, 1000);

        return () => clearInterval(timer); // cleanup on component unmount
    }, [dispatch]);

    const memoizedValue = useMemo(
        () => ({
            ...state,
            setAccessoryStore,
        }),
        [state],
    );

    return (
        <AccessoryStoreContext.Provider value={memoizedValue}>
            {children}
        </AccessoryStoreContext.Provider>
    );
};

export default AccessoryStoreProvider;
