import { TouchableRipple } from "react-native-paper";
import React, { ReactElement, useMemo } from "react";
import { Dimensions, Image, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
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
}

const NightMarketCardItem = ({ item }: Props): ReactElement => {

    const { colors } = useThemeContext();

    const navigate = useNavigation<NavigationProp>();

    const {
        data: weaponSkinData,
        error: weaponSkinError,
        isLoading: isLoadingWeapon,
    } = useGetWeaponByLevelIdQuery(item.Offer.Rewards[0].ItemID);

    const skinData = weaponSkinData?.data;

    const {
        data: themeData,
        error: themeError,
        isLoading: isLoadingTheme,
    } = useGetThemeByIdQuery(skinData?.themeUuid ?? "");

    const filteredDisplayName = useMemo(() => {
        if (!weaponSkinData?.data?.displayName) return "";

        return getWeaponName(weaponSkinData.data.displayName);
    }, [weaponSkinData?.data?.displayName]);

    const onCardPress = () => {
        if (!weaponSkinData || !themeData) return;
        navigate.navigate("SkinDetails", {
            skin: weaponSkinData.data,
            skinType: filteredDisplayName,
            theme: themeData?.data,
        });
    };

    if (isLoadingWeapon || isLoadingTheme) return <NightMarketCardSkeleton />;

    if (weaponSkinError || !skinData || themeError || !themeData) return <Error />;

    const theme = themeData.data;

    return (
        <TouchableRipple
            borderless
            onPress={onCardPress}
            style={{ borderRadius: 16 }}
            rippleColor="rgba(255, 70, 86, .20)"
        >
            <View
                style={{
                    padding: 8,
                    borderRadius: 16,
                    overflow: "hidden",
                    position: "relative",
                    maxWidth: WIDTH - 32,
                    backgroundColor: getContentTierColor(skinData.contentTierUuid),
                }}
            >

                <Image
                    source={getContentTierIcon(skinData.contentTierUuid)}
                    blurRadius={6}
                    resizeMode="cover"
                    style={{
                        right: 0,
                        bottom: 0,
                        top: "30%",
                        left: "50%",
                        opacity: .1,
                        position: "absolute",
                    }}
                />
                <Image
                    source={{ uri: theme.displayIcon }}
                    blurRadius={6}
                    resizeMode="contain"
                    style={{
                        left: 0,
                        top: "10%",
                        right: "60%",
                        opacity: .05,
                        bottom: "30%",
                        position: "absolute",
                    }}
                />
                <DiscountBadge discount={item.DiscountPercent} />
                <Text variant="titleLarge">
                    {themeData.data.displayName}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                    <Text
                        numberOfLines={1}
                        variant="titleMedium"
                        style={{ flex: 1, opacity: .5, textTransform: "uppercase" }}
                    >
                        {filteredDisplayName}
                    </Text>
                </View>
                <Image
                    source={{ uri: skinData.displayIcon ?? skinData.chromas[0].displayIcon }}
                    style={{
                        height: 65,
                        marginTop: 16,
                        maxWidth: WIDTH - 32,
                    }}
                    resizeMode="contain"
                />
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <View style={{ gap: 4 }}>
                        <Text
                            variant="titleMedium"
                            style={{ color: colors.primary, position: "relative", textDecorationLine: "line-through" }}
                        >
                            {item.Offer.Cost[Object.keys(item.Offer.Cost)[0]]}
                        </Text>
                        <CostPoint
                            currencyId={Object.keys(item.DiscountCosts)[0]}
                            cost={item.DiscountCosts[Object.keys(item.DiscountCosts)[0]]}
                        />
                    </View>
                    <Image
                        source={getContentTierIcon(skinData.contentTierUuid)}
                        blurRadius={2}
                        resizeMode="cover"
                        style={{ width: 32, height: 32 }}
                    />
                </View>
            </View>
        </TouchableRipple>
    );
};

export default NightMarketCardItem;
