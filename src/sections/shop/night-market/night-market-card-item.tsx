import { Dimensions, Image, View } from "react-native";
import { ReactElement, useMemo } from "react";
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
import { BonusStoreOffer } from "@/types/api/shop/night-market";
// utils
import { getContentTierColor, getContentTierIcon } from "@/utils/content-tier-icon";
import { getWeaponName } from "@/utils/format-string";

const WIDTH = Dimensions.get("window").width;

type Props = {
    item: BonusStoreOffer;
}

const NightMarketCardItem = ({ item }: Props): ReactElement => {

    const { colors } = useThemeContext();

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

    if (isLoadingWeapon || isLoadingTheme) return <NightMarketCardSkeleton />;

    if (weaponSkinError || !skinData || themeError || !themeData) return <Error />;

    const theme = themeData.data;

    return (
        <View
            style={{
                maxWidth: WIDTH - 32,
                padding: 8,
                borderRadius: 16,
                overflow: "hidden",
                position: "relative",
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
                    position: "absolute",
                    top: "10%",
                    left: 0,
                    right: "60%",
                    bottom: "30%",
                    opacity: .05,
                }}
            />
            <DiscountBadge discount={item.DiscountPercent} />
            <Text variant="titleLarge">
                {themeData.data.displayName}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Text
                    variant="titleMedium"
                    style={{ flex: 1, opacity: .5, textTransform: "uppercase" }}
                    numberOfLines={1}
                >
                    {filteredDisplayName}
                </Text>
            </View>
            <Image
                source={{ uri: skinData.displayIcon ?? skinData.chromas[0].displayIcon }}
                style={{
                    height: 65,
                    maxWidth: WIDTH - 32,
                    marginTop: 16,
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
    );
};

export default NightMarketCardItem;
