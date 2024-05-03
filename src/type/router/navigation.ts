import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
// type
import { BundleInfo } from "@/type/api/shop/bundle";
import { WeaponSkin } from "@/type/api/shop/weapon-skin";
import { StoreOffer } from "@/type/api/shop/plugin-store";
import { WeaponTheme } from "@/type/api/shop/weapon-theme";
import { Buddy, Offer, PlayerCard, Spray } from "@/type/api/shop";

export type RootStackParamList = {
    Login: undefined;
    Multifactor: undefined;
    Home: undefined;
    Plugin: { plugin: StoreOffer };
    SkinDetails: { skin: WeaponSkin, skinType: string, theme: WeaponTheme };
    CardDetails: { playercard: PlayerCard, offer: Offer, theme: BundleInfo };
    BuddyDetails: { buddy: Buddy, offer: Offer, theme: BundleInfo };
    SprayDetails: { spray: Spray, offer: Offer, theme: BundleInfo };
};

export type StoreStackParamList = {
    StoreStack: undefined;
};

export type PluginDetailScreenProps = NativeStackScreenProps<RootStackParamList, "Plugin">;
export type SkinDetailScreenProps = NativeStackScreenProps<RootStackParamList, "SkinDetails">;
export type CardDetailScreenProps = NativeStackScreenProps<RootStackParamList, "CardDetails">;
export type BuddyDetailScreenProps = NativeStackScreenProps<RootStackParamList, "BuddyDetails">;
export type SprayDetailScreenProps = NativeStackScreenProps<RootStackParamList, "SprayDetails">;

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type NavigationStoreProp = NativeStackNavigationProp<StoreStackParamList>;
