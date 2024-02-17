import { ReactElement } from "react";
import { Text } from "react-native-paper";
import { Dimensions, Image, ImageBackground, View } from "react-native";
// api
import { useGetThemeByIdQuery, useGetWeaponByLevelIdQuery } from "@/api/rtk-valorant-api";
// component
import Error from "@/component/error/error";
import Loading from "@/component/loading/loading";
// context
import { useThemeContext } from "@/context/hook/use-theme-context";
// section
import CostPoint from "@/section/shop/cost-point";
// type
import { Offer } from "@/type/api/shop";
// util
import { getContentTierIcon } from "@/util/content-tier-icon";

type Props = {
    item: Offer;
}

const width = Dimensions.get("window").width;

const CardItemOffer = ({ item }: Props): ReactElement => {

    const { colors } = useThemeContext();

    const {
        data: weaponSkinData,
        error: weaponSkinError,
        isLoading: isLoadingWeapon
    } = useGetWeaponByLevelIdQuery(item.Rewards[0].ItemID);

    const skinData = weaponSkinData?.data;

    const {
        data: themeData,
        error: themeError,
        isLoading: isLoadingTheme
    } = useGetThemeByIdQuery(skinData?.themeUuid ?? "");

    if (isLoadingWeapon || isLoadingTheme) {
        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#222429",
                borderRadius: 16,
                width: width / 2 - 24
            }}>
                <Loading />
            </View>
        );
    }

    if (weaponSkinError || !skinData || themeError || !themeData) return <Error />;

    const theme = themeData.data;

    return (
        <ImageBackground
            style={{
                flex: 1,
                padding: 16,
                position: "relative",
                overflow: "hidden",
                borderRadius: 16,
                maxWidth: width / 2 - 24,
                backgroundColor: colors.card
            }}
            source={{ uri: skinData.wallpaper }}
        >
            {!skinData.wallpaper && (
                <Image
                    source={getContentTierIcon(skinData.contentTierUuid)}
                    blurRadius={2}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity: .1
                    }}
                />
            )}
            <Text variant="titleLarge" style={{ color: colors.text, fontWeight: "bold" }} numberOfLines={1}>
                {skinData.displayName.replace(theme.displayName, "").replace(/\s/g, "")}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Image source={{ uri: theme.displayIcon }} style={{ width: 24, height: 24 }} />
                <Text variant="labelLarge" style={{ flex: 1, color: colors.text, opacity: .5 }} numberOfLines={1}>
                    {theme.displayName}
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
