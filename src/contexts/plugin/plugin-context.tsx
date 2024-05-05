import { createContext } from "react";
// types
import { IPluginContext } from "@/types/context/plugin";

// ----------------------------------------------------------

export const initialPluginState: IPluginContext = {
    plugins: undefined,
    setPlugins: () => {},
};

// ----------------------------------------------------------

export const PluginContext = createContext(initialPluginState);
