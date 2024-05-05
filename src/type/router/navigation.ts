import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
// type
import { Theme } from "@/type/api/shop/theme";
import { WeaponSkin } from "@/type/api/shop/weapon-skin";
import { StoreOffer } from "@/type/api/shop/plugin-store";
import { Buddy, Offer, PlayerCard, Spray } from "@/type/api/shop";

export type RootStackParamList = {
    Login: undefined;
    Multifactor: undefined;
    Home: undefined;
    Plugin: { plugin: StoreOffer };
    SkinDetails: { skin: WeaponSkin, skinType: string, theme: Theme };
    PlayerCardDetails: { playercard: PlayerCard, offer: Offer };
    BuddyDetails: { buddy: Buddy, offer: Offer };
    SprayDetails: { spray: Spray, offer: Offer };
};

export type StoreStackParamList = {
    StoreStack: undefined;
};

export type PluginDetailScreenProps = NativeStackScreenProps<RootStackParamList, "Plugin">;
export type SkinDetailScreenProps = NativeStackScreenProps<RootStackParamList, "SkinDetails">;
export type BuddyDetailScreenProps = NativeStackScreenProps<RootStackParamList, "BuddyDetails">;
export type SprayDetailScreenProps = NativeStackScreenProps<RootStackParamList, "SprayDetails">;
export type PlayerCardDetailScreenProps = NativeStackScreenProps<RootStackParamList, "PlayerCardDetails">;

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
