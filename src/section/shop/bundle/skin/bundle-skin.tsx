import { Image, ImageBackground, View } from "react-native";
// api
import { useGetThemeByIdQuery, useGetWeaponByLevelIdQuery } from "@/api/rtk-valorant-api";
// component
import Error from "@/component/error/error";
import Text from "@/component/typography/text";
// section
import CostPoint from "@/section/shop/cost-point";
// type
import { Offer } from "@/type/api/shop";
// util
import { getContentTierIcon } from "@/util/content-tier-icon";
import BundleSkinSkeleton from "@/section/shop/bundle/skin/bundle-skin-skeleton";

// -------------------------------------------------

type Props = {
    offer: Offer;
}

const BundleSkin = ({ offer }: Props) => {

    const {
        data: weaponSkinData,
        error: weaponSkinError,
        isLoading: isLoadingWeapon
    } = useGetWeaponByLevelIdQuery(offer.Rewards[0].ItemID);

    const skinData = weaponSkinData?.data;

    const {
        data: themeData,
        error: themeError,
        isLoading: isLoadingTheme
    } = useGetThemeByIdQuery(skinData?.themeUuid ?? "");

    if (isLoadingWeapon || isLoadingTheme) return <BundleSkinSkeleton />;

    if (weaponSkinError || !skinData || themeError || !themeData) return <Error />;

    const theme = themeData.data;

    return (
        <ImageBackground
            source={{ uri: skinData.wallpaper }}
            resizeMode="cover"
            style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 16,
                padding: 8,
                backgroundColor: "#222429"
            }}
        >
            <Text variant="titleLarge" style={{ fontWeight: "bold" }} numberOfLines={1}>
                {skinData.displayName.replace(theme.displayName, "").replace(/\s/g, "")}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                {theme.displayIcon &&
                    <Image source={{ uri: theme.displayIcon }} style={{ width: 24, height: 24 }} />}
                <Text variant="labelLarge" style={{ flex: 1, opacity: .5 }} numberOfLines={1}>
                    {theme.displayName}
                </Text>
            </View>
            <Image
                source={{ uri: skinData.displayIcon ?? skinData.chromas[0].displayIcon }}
                style={{ flex: 1, height: 70 }}
                resizeMode="center"
            />
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <CostPoint currencyId={Object.keys(offer.Cost)[0]} cost={offer.Cost[Object.keys(offer.Cost)[0]]} />
                <Image
                    source={getContentTierIcon(skinData.contentTierUuid)}
                    blurRadius={2}
                    resizeMode="cover"
                    style={{ width: 32, height: 32 }}
                />
            </View>
        </ImageBackground>
    );
};

export default BundleSkin;
