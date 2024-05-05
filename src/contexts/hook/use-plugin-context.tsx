import { useContext } from "react";
//
import { PluginContext } from "../plugin/plugin-context";

const usePluginContext = () => {
    const context = useContext(PluginContext);

    if (!context) throw new Error("usePluginContext context must be use inside PluginProvider");

    return context;
};

export default usePluginContext;
