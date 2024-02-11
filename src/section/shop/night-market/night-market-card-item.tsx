import { Image, View } from "react-native";
import { ReactElement, useEffect, useMemo, useState } from "react";
// api
import valorantProvider from "@/api/valorant-provider";
// component
import Text from "@/component/typography/text";
import Loading from "@/component/loading/loading";
// context
import { useThemeContext } from "@/context/hook/use-theme-context";
// type
import { WeaponSkin } from "@/type/api/shop/weapon-skin";
import { WeaponTheme } from "@/type/api/shop/weapon-theme";
import { BonusStoreOffer } from "@/type/api/shop/night-market";
// util
import { getContentTierColor, getContentTierIcon } from "@/util/content-tier-icon";
import DiscountBadge from "@/section/shop/night-market/discount-badge";
import CostPoint from "@/section/shop/cost-point";

type Props = {
    item: BonusStoreOffer;
}

const NightMarketCardItem = ({ item }: Props): ReactElement => {

    const { colors } = useThemeContext();

    const [skinData, setSkinData] = useState<WeaponSkin | undefined>();

    const [themeData, setThemeData] = useState<WeaponTheme | undefined>();

    useEffect(() => {
        const getWeaponData = async () => {
            try {
                const response = await valorantProvider.getWeaponLevelById(item.Offer.Rewards[0].ItemID);
                const themeResponse = await valorantProvider.getThemeById(response.themeUuid);

                if (!response) return;

                setSkinData(response);
                setThemeData(themeResponse);
            } catch (error) {
                console.error(error);
            }
        };
        (async () => getWeaponData())();
    }, []);


    const discountCostsPercentage = useMemo(() => {
        return Math.floor((item.Offer.Cost[Object.keys(item.Offer.Cost)[0]] - item.DiscountCosts[Object.keys(item.DiscountCosts)[0]]) / item.Offer.Cost[Object.keys(item.Offer.Cost)[0]] * 100);
    }, [item]);

    if (!skinData?.uuid || !themeData?.uuid) {
        return (
            <View
                className="bg-[#222429] p-4"
                style={{ position: "relative", overflow: "hidden", borderRadius: 16, gap: 8 }}
            >
                <Loading />
            </View>
        );
    }

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
                source={{ uri: themeData.displayIcon }}
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
                {skinData.displayName.replace(themeData.displayName, "").replace(/\s/g, "")}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Text variant="labelLarge" style={{ flex: 1, color: colors.text, opacity: .5 }} numberOfLines={1}>
                    {themeData.displayName}
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
