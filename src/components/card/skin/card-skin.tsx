import React, { useMemo, useCallback } from "react";
import { TouchableRipple } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Image, ImageBackground, View, StyleSheet } from "react-native";
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

type Props = {
    offer: Offer;
}

const CardSkin = ({ offer }: Props) => {
    const { colors } = useThemeContext();
    const navigate = useNavigation<NavigationProp>();

    const {
        data: weaponSkinData,
        error: weaponSkinError,
        isLoading: isLoadingWeapon,
    } = useGetWeaponByLevelIdQuery(offer.Rewards[0].ItemID);

    const {
        data: themeData,
        error: themeError,
        isLoading: isLoadingTheme,
    } = useGetThemeByIdQuery(weaponSkinData?.data?.themeUuid || "");

    const skinData = weaponSkinData?.data;

    const filteredDisplayName = useMemo(() => {
        if (!weaponSkinData?.data?.displayName || !themeData?.data?.displayName) return "";
        return getWeaponName(weaponSkinData.data.displayName, themeData.data.displayName);
    }, [weaponSkinData?.data?.displayName, themeData?.data?.displayName]);

    const onCardPress = useCallback(() => {
        if (!weaponSkinData || !themeData) return;
        navigate.navigate("SkinDetails", {
            skin: weaponSkinData.data,
            skinType: filteredDisplayName,
            theme: themeData.data,
        });
    }, [navigate, weaponSkinData, themeData, filteredDisplayName]);

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
            style={[styles.container, { backgroundColor: colors.card }]}
        >
            <ImageBackground
                resizeMode="cover"
                source={{ uri: skinData.wallpaper }}
                style={styles.imageBackground}
            >
                <Text variant="titleLarge" numberOfLines={1}>{filteredDisplayName}</Text>
                <Image
                    resizeMode="contain"
                    style={styles.skinImage}
                    source={{ uri: skinData.displayIcon ?? skinData.chromas[0].displayIcon }}
                />
                <View style={styles.footer}>
                    <CostPoint currencyId={Object.keys(offer.Cost)[0]} cost={offer.Cost[Object.keys(offer.Cost)[0]]} />
                    <Image
                        resizeMode="cover"
                        style={styles.contentTierIcon}
                        source={getContentTierIcon(skinData.contentTierUuid)}
                    />
                </View>
            </ImageBackground>
        </TouchableRipple>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 16,
    },
    imageBackground: {
        gap: 16,
        padding: 16,
    },
    skinImage: {
        flex: 1,
        height: 70,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    contentTierIcon: {
        width: 32,
        height: 32,
    },
});

export default React.memo(CardSkin);
