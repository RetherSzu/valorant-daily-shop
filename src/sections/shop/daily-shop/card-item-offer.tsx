import { TouchableRipple } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import React, { ReactElement, useCallback, useMemo } from "react";
import { Dimensions, Image, ImageBackground, StyleSheet, View } from "react-native";
// api
import { useGetThemeByIdQuery, useGetWeaponByLevelIdQuery } from "@/api/rtk-valorant-api";
// components
import Error from "@/components/error/error";
import Text from "@/components/typography/text";
import CostPoint from "@/components/cost/cost-point";
// contexts
import useThemeContext from "@/contexts/hook/use-theme-context";
// sections
import CardOfferSkeleton from "@/sections/shop/daily-shop/card-offer-skeleton";
// types
import { Offer } from "@/types/api/shop";
import { NavigationProp } from "@/types/router/navigation";
// utils
import { getWeaponName } from "@/utils/format-string";
import { getContentTierIcon } from "@/utils/content-tier-icon";

const WIDTH = Dimensions.get("window").width;

type Props = {
    item: Offer;
};

const CardItemOffer = ({ item }: Props): ReactElement => {

    const { colors } = useThemeContext();

    const navigate = useNavigation<NavigationProp>();

    const {
        data: weaponSkinData,
        error: weaponSkinError,
        isLoading: isLoadingWeapon,
    } = useGetWeaponByLevelIdQuery(item.Rewards[0].ItemID);

    const {
        data: themeData,
        error: themeError,
        isLoading: isLoadingTheme,
    } = useGetThemeByIdQuery(weaponSkinData?.data?.themeUuid ?? "");

    const skinData = weaponSkinData?.data;

    const filteredDisplayName = useMemo(() => {
        if (!weaponSkinData?.data?.displayName) return "";
        return getWeaponName(weaponSkinData.data.displayName, themeData?.data?.displayName);
    }, [weaponSkinData?.data?.displayName, themeData?.data?.displayName]);

    const onCardPress = useCallback(() => {
        if (!weaponSkinData || !themeData) return;
        navigate.navigate("SkinDetails", {
            skin: weaponSkinData.data,
            skinType: filteredDisplayName,
            theme: themeData.data,
        });
    }, [navigate, weaponSkinData, themeData, filteredDisplayName]);

    const MemoizedCardOfferSkeleton = useMemo(() => <CardOfferSkeleton />, []);

    if (isLoadingWeapon || isLoadingTheme) return MemoizedCardOfferSkeleton;
    if (weaponSkinError || !skinData || themeError || !themeData) return <Error />;

    return (
        <TouchableRipple
            borderless
            onPress={onCardPress}
            rippleColor="rgba(255, 70, 86, .20)"
            style={[styles.touchable, { backgroundColor: colors.card }]}
        >
            <ImageBackground style={styles.imageBackground} source={{ uri: skinData.wallpaper }}>
                {!skinData.wallpaper && (
                    <Image
                        blurRadius={2}
                        style={styles.contentTierIcon}
                        source={getContentTierIcon(skinData.contentTierUuid)}
                    />
                )}
                <Text variant="titleLarge" numberOfLines={1}>
                    {themeData.data.displayName}
                </Text>
                {filteredDisplayName !== "" && (
                    <View style={styles.row}>
                        <Image source={{ uri: themeData.data.displayIcon }} style={styles.icon} />
                        <Text
                            numberOfLines={1}
                            variant="titleMedium"
                            style={styles.filteredDisplayName}
                        >
                            {filteredDisplayName}
                        </Text>
                    </View>
                )}
                <Image
                    resizeMode="center"
                    style={styles.skinImage}
                    source={{
                        uri: skinData.levels[0].displayIcon
                            ?? skinData.chromas[0].displayIcon
                            ?? skinData.chromas[0].fullRender,
                    }}
                />
                <CostPoint currencyId={Object.keys(item.Cost)[0]} cost={item.Cost[Object.keys(item.Cost)[0]]} />
            </ImageBackground>
        </TouchableRipple>
    );
};

const styles = StyleSheet.create({
    touchable: {
        flex: 1,
        borderRadius: 16,
        overflow: "hidden",
        maxWidth: WIDTH / 2 - 20,
    },
    imageBackground: {
        flex: 1,
        padding: 16,
        position: "relative",
    },
    contentTierIcon: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    icon: {
        width: 16,
        height: 16,
    },
    filteredDisplayName: {
        flex: 1,
        opacity: 0.5,
        textTransform: "uppercase",
    },
    skinImage: {
        flex: 1,
        transform: [{ rotate: "22.5deg" }],
    },
});

export default React.memo(CardItemOffer);
