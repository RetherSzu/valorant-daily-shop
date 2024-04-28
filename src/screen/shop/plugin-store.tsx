import { View } from "react-native";
// component
import Loading from "@/component/loading/loading";
// context
import useThemeContext from "@/context/hook/use-theme-context";
import usePluginContext from "@/context/hook/use-plugin-context";
// section
import PluginList from "@/section/shop/plugin-store/plugin-list";

const PluginStore = () => {

    const { colors } = useThemeContext();

    const { plugins } = usePluginContext();

    if (!plugins) return <Loading />;

    return (
        <View style={{ backgroundColor: colors.background, flex: 1, paddingHorizontal: 16, paddingVertical: 8 }}>
            <PluginList />
        </View>
    );
};

export default PluginStore;
