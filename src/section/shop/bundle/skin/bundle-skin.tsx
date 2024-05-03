import { useMemo } from "react";
import { TouchableRipple } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Image, ImageBackground, View } from "react-native";
// api
import { useGetWeaponByLevelIdQuery } from "@/api/rtk-valorant-api";
// component
import Error from "@/component/error/error";
import Text from "@/component/typography/text";
// context
import useThemeContext from "@/context/hook/use-theme-context";
// section
import CostPoint from "@/section/shop/cost-point";
import BundleSkinSkeleton from "@/section/shop/bundle/skin/bundle-skin-skeleton";
// type
import { Offer } from "@/type/api/shop";
import { BundleInfo } from "@/type/api/shop/bundle";
import { NavigationProp } from "@/type/router/navigation";
// util
import { getWeaponName } from "@/util/format-string";
import { getContentTierIcon } from "@/util/content-tier-icon";

// -------------------------------------------------

type Props = {
    offer: Offer;
    theme: BundleInfo;
}

const BundleSkin = ({ offer, theme }: Props) => {

    const { colors } = useThemeContext();

    const {
        data: weaponSkinData,
        error: weaponSkinError,
        isLoading: isLoadingWeapon,
    } = useGetWeaponByLevelIdQuery(offer.Rewards[0].ItemID);

    const skinData = weaponSkinData?.data;

    const navigate = useNavigation<NavigationProp>();

    const filteredDisplayName = useMemo(() => {
        if (!weaponSkinData?.data?.displayName) return "";

        return getWeaponName(weaponSkinData.data.displayName, theme.displayName);
    }, [weaponSkinData?.data?.displayName]);

    const onCardPress = () => {
        if (!weaponSkinData) return;
        navigate.navigate("SkinDetails", {
            skin: weaponSkinData.data,
            skinType: filteredDisplayName,
            theme,
        });
    };

    if (isLoadingWeapon) {
        return <BundleSkinSkeleton />;
    }

    if (weaponSkinError || !skinData) {
        return <Error />;
    }

    return (
        <TouchableRipple
            borderless
            onPress={onCardPress}
            rippleColor="rgba(255, 70, 86, .20)"
            style={{ flex: 1, borderRadius: 16, backgroundColor: colors.card }}
        >
            <ImageBackground
                resizeMode="cover"
                source={{ uri: skinData.wallpaper }}
                style={{ gap: 16, padding: 16 }}
            >
                <Text variant="titleLarge" numberOfLines={1}>{filteredDisplayName}</Text>
                <Image
                    resizeMode="contain"
                    style={{ flex: 1, height: 70 }}
                    source={{ uri: skinData.displayIcon ?? skinData.chromas[0].displayIcon }}
                />
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <CostPoint currencyId={Object.keys(offer.Cost)[0]} cost={offer.Cost[Object.keys(offer.Cost)[0]]} />
                    <Image
                        resizeMode="cover"
                        style={{ width: 32, height: 32 }}
                        source={getContentTierIcon(skinData.contentTierUuid)}
                    />
                </View>
            </ImageBackground>
        </TouchableRipple>
    );
};

export default BundleSkin;
