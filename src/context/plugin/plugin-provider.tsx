import { ReactNode, useMemo, useReducer } from "react";
// type
import { PluginStores } from "@/type/api/shop/plugin-store";
import { EPluginContextType, IPluginAction, IPluginContext } from "@/type/context/plugin";
//
import { initialPluginState, PluginContext } from "./plugin-context";

const reducer = (state: IPluginContext, action: IPluginAction<EPluginContextType>) => {
    let ac;

    switch (action.type) {
        case EPluginContextType.SET_PLUGINS:
            ac = action as IPluginAction<EPluginContextType.SET_PLUGINS>;
            return {
                ...state,
                plugins: ac.payload.plugins,
            };
        default:
            return state;
    }
};

type BundleProviderProps = {
    children: ReactNode;
};

const PluginProvider = ({ children }: BundleProviderProps) => {

    const [state, dispatch] = useReducer(reducer, initialPluginState);

    const setPlugins = (plugins?: PluginStores) => {
        if (!plugins) return;
        dispatch({
            type: EPluginContextType.SET_PLUGINS,
            payload: { plugins },
        });
    };

    const memoizedValue = useMemo(
        () => ({
            ...state,
            setPlugins,
        }),
        [state],
    );

    return (
        <PluginContext.Provider value={memoizedValue}>
            {children}
        </PluginContext.Provider>
    );
};

export default PluginProvider;
