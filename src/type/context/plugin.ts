// type
import { PluginStores } from "@/type/api/shop/plugin-store";

export type IPluginContext = {
    plugins?: PluginStores;
    setPlugins: (plugins?: PluginStores) => void;
}

export enum EPluginContextType {
    SET_PLUGINS = "SET_BUNDLES",
}

export type IPayloadPlugin = {
    [EPluginContextType.SET_PLUGINS]: {
        plugins: PluginStores
    };
};

export type IPluginAction<T extends EPluginContextType> = {
    type: T;
    payload: IPayloadPlugin[T];
}
