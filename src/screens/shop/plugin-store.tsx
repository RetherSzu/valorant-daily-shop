import { View } from "react-native";
// components
import Loading from "@/components/loading/loading";
// contexts
import useThemeContext from "@/contexts/hook/use-theme-context";
import usePluginContext from "@/contexts/hook/use-plugin-context";
// sections
import PluginList from "@/sections/shop/plugin-store/plugin-list";

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
