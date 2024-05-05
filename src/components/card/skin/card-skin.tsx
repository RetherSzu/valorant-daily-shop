import { useMemo } from "react";
import { TouchableRipple } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Image, ImageBackground, View } from "react-native";
// api
import { useGetThemeByIdQuery, useGetWeaponByLevelIdQuery } from "@/api/rtk-valorant-api";
// components
import Error from "@/components/error/error";
import Text from "@/components/typography/text";
import CostPoint from "@/components/cost/cost-point";
import CardSkinSkeleton from "@/components/card/skin/card-skin-skeleton";
// contexts
import useThemeContext from "@/contexts/hook/use-theme-context";
// types
import { Offer } from "@/types/api/shop";
import { NavigationProp } from "@/types/router/navigation";
// utils
import { getWeaponName } from "@/utils/format-string";
import { getContentTierIcon } from "@/utils/content-tier-icon";

// -------------------------------------------------

type Props = {
    offer: Offer;
}

const CardSkin = ({ offer }: Props) => {

    const { colors } = useThemeContext();

    const {
        data: weaponSkinData,
        error: weaponSkinError,
        isLoading: isLoadingWeapon,
    } = useGetWeaponByLevelIdQuery(offer.Rewards[0].ItemID);

    const {
        data: themeData,
        error: themeError,
        isLoading: isLoadingTheme,
    } = useGetThemeByIdQuery(weaponSkinData?.data.themeUuid || "");

    const skinData = weaponSkinData?.data;

    const navigate = useNavigation<NavigationProp>();

    const filteredDisplayName = useMemo(() => {
        if (!weaponSkinData?.data?.displayName || !themeData?.data.displayName) return "";

        return getWeaponName(weaponSkinData.data.displayName, themeData?.data.displayName);
    }, [weaponSkinData?.data?.displayName, themeData?.data.displayName]);

    const onCardPress = () => {
        if (!weaponSkinData || !themeData) return;
        navigate.navigate("SkinDetails", {
            skin: weaponSkinData.data,
            skinType: filteredDisplayName,
            theme: themeData?.data,
        });
    };

    if (isLoadingWeapon || isLoadingTheme) {
        return <CardSkinSkeleton />;
    }

    if (weaponSkinError || !skinData || themeError || !themeData) {
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

export default CardSkin;
