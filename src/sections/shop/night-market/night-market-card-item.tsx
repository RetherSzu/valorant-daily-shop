import { TouchableRipple } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import React, { ReactElement, useCallback, useMemo } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
// api
import { useGetThemeByIdQuery, useGetWeaponByLevelIdQuery } from "@/api/rtk-valorant-api";
// components
import Error from "@/components/error/error";
import Text from "@/components/typography/text";
import CostPoint from "@/components/cost/cost-point";
import DiscountBadge from "@/components/cost/discount-badge";
// contexts
import useThemeContext from "@/contexts/hook/use-theme-context";
// sections
import NightMarketCardSkeleton from "@/sections/shop/night-market/night-market-card-skeleton";
// types
import { NavigationProp } from "@/types/router/navigation";
import { BonusStoreOffer } from "@/types/api/shop/night-market";
// utils
import { getWeaponName } from "@/utils/format-string";
import { getContentTierColor, getContentTierIcon } from "@/utils/content-tier-icon";

const WIDTH = Dimensions.get("window").width;

type Props = {
    item: BonusStoreOffer;
};

const NightMarketCardItem = ({ item }: Props): ReactElement => {

    const { colors } = useThemeContext();

    const navigate = useNavigation<NavigationProp>();

    const {
        data: weaponSkinData,
        error: weaponSkinError,
        isLoading: isLoadingWeapon,
    } = useGetWeaponByLevelIdQuery(item.Offer.Rewards[0].ItemID);

    const skinData = weaponSkinData?.data;

    const { data: themeData, error: themeError, isLoading: isLoadingTheme } = useGetThemeByIdQuery(
        skinData?.themeUuid ?? "",
    );

    const filteredDisplayName = useMemo(() => {
        if (!weaponSkinData?.data?.displayName) return "";
        return getWeaponName(weaponSkinData.data.displayName);
    }, [weaponSkinData?.data?.displayName]);

    const onCardPress = useCallback(() => {
        if (!weaponSkinData || !themeData) return;
        navigate.navigate("SkinDetails", {
            skin: weaponSkinData.data,
            skinType: filteredDisplayName,
            theme: themeData?.data,
        });
    }, [navigate, weaponSkinData, themeData, filteredDisplayName]);

    if (isLoadingWeapon || isLoadingTheme) return <NightMarketCardSkeleton />;

    if (weaponSkinError || !skinData || themeError || !themeData) return <Error />;

    const theme = themeData.data;

    return (
        <TouchableRipple
            key={item.BonusOfferID}
            style={styles.touchable}
            onPress={onCardPress}
            borderless
            rippleColor="rgba(255, 70, 86, .20)"
        >
            <View style={[styles.card, { backgroundColor: getContentTierColor(skinData.contentTierUuid) }]}>
                <Image
                    source={getContentTierIcon(skinData.contentTierUuid)}
                    blurRadius={6}
                    resizeMode="cover"
                    style={styles.backgroundIcon}
                />
                <Image
                    source={{ uri: theme.displayIcon }}
                    blurRadius={6}
                    resizeMode="contain"
                    style={styles.backgroundTheme}
                />
                <DiscountBadge discount={item.DiscountPercent} />
                <Text variant="titleLarge">{themeData.data.displayName}</Text>
                <View style={styles.row}>
                    <Text numberOfLines={1} variant="titleMedium" style={styles.displayName}>
                        {filteredDisplayName}
                    </Text>
                </View>
                <Image
                    source={{ uri: skinData.displayIcon ?? skinData.chromas[0].displayIcon }}
                    style={styles.skinImage}
                    resizeMode="contain"
                />
                <View style={styles.costContainer}>
                    <View style={styles.cost}>
                        <Text variant="titleMedium" style={[styles.originalCost, { color: colors.primary }]}>
                            {item.Offer.Cost[Object.keys(item.Offer.Cost)[0]]}
                        </Text>
                        <CostPoint currencyId={Object.keys(item.DiscountCosts)[0]}
                                   cost={item.DiscountCosts[Object.keys(item.DiscountCosts)[0]]} />
                    </View>
                    <Image source={getContentTierIcon(skinData.contentTierUuid)} blurRadius={2} resizeMode="cover"
                           style={styles.contentTierIcon} />
                </View>
            </View>
        </TouchableRipple>
    );
};

const styles = StyleSheet.create({
    touchable: {
        borderRadius: 16,
    },
    card: {
        padding: 8,
        borderRadius: 16,
        overflow: "hidden",
        position: "relative",
        maxWidth: WIDTH - 32,
    },
    backgroundIcon: {
        right: 0,
        bottom: 0,
        top: "30%",
        left: "50%",
        opacity: 0.1,
        position: "absolute",
    },
    backgroundTheme: {
        left: 0,
        top: "10%",
        right: "60%",
        opacity: 0.05,
        bottom: "30%",
        position: "absolute",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    displayName: {
        flex: 1,
        opacity: 0.5,
        textTransform: "uppercase",
    },
    skinImage: {
        height: 65,
        marginTop: 16,
        maxWidth: WIDTH - 32,
    },
    costContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    cost: {
        gap: 4,
    },
    originalCost: {
        position: "relative",
        textDecorationLine: "line-through",
    },
    contentTierIcon: {
        width: 32,
        height: 32,
    },
});

export default React.memo(NightMarketCardItem);
