import { View } from "react-native";
// contexts
import usePluginContext from "@/contexts/hook/use-plugin-context";
// sections
import PluginItem from "@/sections/shop/plugin-store/plugin-item";

const PluginList = () => {

    const { plugins } = usePluginContext();

    if (!plugins) return;

    const renderPlugins = (
        <>
            {plugins.map((plugin, index) => {
                return <PluginItem plugin={plugin} key={index} />;
            })}
        </>
    );

    return (
        <View style={{ flex: 1 }}>
            {renderPlugins}
        </View>
    );
};

export default PluginList;
