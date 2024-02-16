import { Image, View } from "react-native";
import { ReactElement, useMemo } from "react";
// api
import { useGetThemeByIdQuery, useGetWeaponByLevelIdQuery } from "@/api/rtk-valorant-api";
// component
import Error from "@/component/error/error";
import Text from "@/component/typography/text";
import Loading from "@/component/loading/loading";
// context
import { useThemeContext } from "@/context/hook/use-theme-context";
// section
import CostPoint from "@/section/shop/cost-point";
import DiscountBadge from "@/section/shop/night-market/discount-badge";
// type
import { BonusStoreOffer } from "@/type/api/shop/night-market";
// util
import { getContentTierColor, getContentTierIcon } from "@/util/content-tier-icon";

type Props = {
    item: BonusStoreOffer;
}

const NightMarketCardItem = ({ item }: Props): ReactElement => {

    const { colors } = useThemeContext();

    const discountCostsPercentage = useMemo(() => {
        return Math.floor((item.Offer.Cost[Object.keys(item.Offer.Cost)[0]] - item.DiscountCosts[Object.keys(item.DiscountCosts)[0]]) / item.Offer.Cost[Object.keys(item.Offer.Cost)[0]] * 100);
    }, [item]);

    const {
        data: weaponSkinData,
        error: weaponSkinError,
        isLoading: isLoadingWeapon
    } = useGetWeaponByLevelIdQuery(item.Offer.Rewards[0].ItemID);

    const skinData = weaponSkinData?.data;

    const {
        data: themeData,
        error: themeError,
        isLoading: isLoadingTheme
    } = useGetThemeByIdQuery(skinData?.themeUuid ?? "");

    if (isLoadingWeapon || isLoadingTheme) return <Loading />;

    if (weaponSkinError || !skinData || themeError || !themeData) return <Error />;

    const theme = themeData.data;

    return (
        <View
            className="bg-[#222429] p-4"
            style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 16,
                backgroundColor: getContentTierColor(skinData.contentTierUuid)
            }}
        >
            <Image
                source={getContentTierIcon(skinData.contentTierUuid)}
                blurRadius={6}
                resizeMode="cover"
                style={{
                    position: "absolute",
                    top: "30%",
                    left: "50%",
                    right: 0,
                    bottom: 0,
                    opacity: .1
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
                    opacity: .05
                }}
            />
            <DiscountBadge discount={discountCostsPercentage} />
            <Text variant="titleLarge" style={{ color: colors.text, fontWeight: "bold" }} numberOfLines={1}>
                {skinData.displayName.replace(theme.displayName, "").replace(/\s/g, "")}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Text variant="labelLarge" style={{ flex: 1, color: colors.text, opacity: .5 }} numberOfLines={1}>
                    {theme.displayName}
                </Text>
            </View>
            <Image
                source={{ uri: skinData.displayIcon ?? skinData.chromas[0].displayIcon }}
                style={{ height: 65, flex: 1, transform: [{ scale: 1.25 }], marginTop: 16 }}
                resizeMode="center"
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
