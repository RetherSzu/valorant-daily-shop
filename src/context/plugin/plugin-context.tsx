import { createContext } from "react";
// type
import { IPluginContext } from "@/type/context/plugin";

// ----------------------------------------------------------

export const initialPluginState: IPluginContext = {
    plugins: undefined,
    setPlugins: () => {},
};

// ----------------------------------------------------------

export const PluginContext = createContext(initialPluginState);
