import { View } from "react-native";
// context
import usePluginContext from "@/context/hook/use-plugin-context";
// section
import PluginItem from "@/section/shop/plugin-store/plugin-item";

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
