import { View } from "react-native";
// component
// context
import { useAuthContext } from "@/context/hook/use-auth-context";
// section
import PluginItem from "@/section/shop/plugin-store/plugin-item";

const PluginList = () => {

    const { shop: { plugins } } = useAuthContext();

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
