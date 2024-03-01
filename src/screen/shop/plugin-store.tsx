import { View } from "react-native";
// component
import Text from "@/component/typography/text";
import Loading from "@/component/loading/loading";
// context
import { useAuthContext } from "@/context/hook/use-auth-context";
import { useThemeContext } from "@/context/hook/use-theme-context";
// section
import PluginList from "@/section/shop/plugin-store/plugin-list";

const PluginStore = () => {

    const { colors } = useThemeContext();

    const { shop: { plugins } } = useAuthContext();

    if (!plugins) return <Loading />;

    return (
        <View style={{ backgroundColor: colors.background, flex: 1, paddingHorizontal: 16, paddingVertical: 8 }}>
            <Text variant="headlineLarge">Plugin Store</Text>
            <PluginList />
        </View>
    );
};

export default PluginStore;
