import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
// type
import { StoreOffer } from "@/type/api/shop/plugin-store";

export type RootStackParamList = {
    Login: undefined;
    Multifactor: undefined;
    Home: undefined;
    Plugin: { plugin: StoreOffer };
};

export type PluginDetailScreenProps = NativeStackScreenProps<RootStackParamList, "Plugin">;

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
