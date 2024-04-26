import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
// type
import { WeaponSkin } from "@/type/api/shop/weapon-skin";
import { StoreOffer } from "@/type/api/shop/plugin-store";
import { WeaponTheme } from "@/type/api/shop/weapon-theme";

export type RootStackParamList = {
    Login: undefined;
    Multifactor: undefined;
    Home: undefined;
    Plugin: { plugin: StoreOffer };
};

export type StoreStackParamList = {
    StoreStack: undefined;
    SkinDetails: { skin: WeaponSkin, skinType: string, theme: WeaponTheme };
};

export type PluginDetailScreenProps = NativeStackScreenProps<RootStackParamList, "Plugin">;
export type SkinDetailScreenProps = NativeStackScreenProps<StoreStackParamList, "SkinDetails">;

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type NavigationStoreProp = NativeStackNavigationProp<StoreStackParamList>;
