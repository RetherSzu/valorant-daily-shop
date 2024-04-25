import { Text } from "react-native-paper";
import { ReactElement, useMemo } from "react";
import { Dimensions, Image, ImageBackground, View } from "react-native";
// api
import { useGetThemeByIdQuery, useGetWeaponByLevelIdQuery } from "@/api/rtk-valorant-api";
// component
import Error from "@/component/error/error";
// context
import { useThemeContext } from "@/context/hook/use-theme-context";
// section
import CostPoint from "@/section/shop/cost-point";
import CardOfferSkeleton from "@/section/shop/daily-shop/card-offer-skeleton";
// type
import { Offer } from "@/type/api/shop";
// util
import { getContentTierIcon } from "@/util/content-tier-icon";

const WIDTH = Dimensions.get("window").width;
const GUN_NAMES = [
    "Classic", "Shorty", "Frenzy", "Ghost", "Sheriff",
    "Stinger", "Spectre", "Bucky", "Judge", "Bulldog",
    "Guardian", "Phantom", "Vandal", "Marshal", "Operator",
    "Ares", "Odin",
];

type Props = {
    item: Offer;
};

const CardItemOffer = ({ item }: Props): ReactElement => {
    const { colors } = useThemeContext();

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
        if (!weaponSkinData?.data?.displayName) return { main: "", gun: "" };

        const displayNameWords = weaponSkinData.data.displayName.split(" ");
        return {
            main: displayNameWords.filter(word => !GUN_NAMES.includes(word)).join(" "),
            gun: displayNameWords.filter(word => GUN_NAMES.includes(word)).join(" "),
        };
    }, [weaponSkinData?.data?.displayName]);

    if (isLoadingWeapon || isLoadingTheme) return <CardOfferSkeleton />;
    if (weaponSkinError || !skinData || themeError || !themeData) return <Error />;

    return (
        <ImageBackground
            style={{
                flex: 1, padding: 8, position: "relative", overflow: "hidden",
                borderRadius: 16, maxWidth: WIDTH / 2 - 24, backgroundColor: colors.card,
            }}
            source={{ uri: skinData.wallpaper }}
        >
            {!skinData.wallpaper && (
                <Image
                    source={getContentTierIcon(skinData.contentTierUuid)}
                    blurRadius={2}
                    style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: .1 }}
                />
            )}
            <Text variant="titleLarge" style={{ color: colors.text, fontWeight: "bold" }}>
                {filteredDisplayName.main}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Image source={{ uri: themeData.data.displayIcon }} style={{ width: 16, height: 16 }} />
                <Text variant="bodyLarge" style={{ flex: 1, color: colors.text, opacity: .5 }} numberOfLines={1}>
                    {filteredDisplayName.gun}
                </Text>
            </View>
            <Image
                source={{ uri: skinData.displayIcon ?? skinData.chromas[0].displayIcon ?? skinData.chromas[0].fullRender }}
                style={{ flex: 1, transform: [{ rotate: "22.5deg" }] }}
                resizeMode="center"
            />
            <CostPoint currencyId={Object.keys(item.Cost)[0]} cost={item.Cost[Object.keys(item.Cost)[0]]} />
        </ImageBackground>
    );
};

export default CardItemOffer;
