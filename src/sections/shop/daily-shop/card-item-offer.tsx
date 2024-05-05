import { ReactElement, useMemo } from "react";
import { TouchableRipple } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, Image, ImageBackground, View } from "react-native";
// api
import { useGetThemeByIdQuery, useGetWeaponByLevelIdQuery } from "@/api/rtk-valorant-api";
// components
import Error from "@/components/error/error";
import Text from "@/components/typography/text";
// contexts
import useThemeContext from "@/contexts/hook/use-theme-context";
// sections
import CostPoint from "@/sections/shop/cost-point";
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
    }, [weaponSkinData?.data?.displayName]);

    const onCardPress = () => {
        if (!weaponSkinData || !themeData) return;
        navigate.navigate("SkinDetails", {
            skin: weaponSkinData.data,
            skinType: filteredDisplayName,
            theme: themeData.data,
        });
    };

    if (isLoadingWeapon || isLoadingTheme) return <CardOfferSkeleton />;
    if (weaponSkinError || !skinData || themeError || !themeData) return <Error />;

    return (
        <TouchableRipple
            borderless
            onPress={onCardPress}
            style={{
                flex: 1,
                borderRadius: 16,
                overflow: "hidden",
                maxWidth: WIDTH / 2 - 20,
                backgroundColor: colors.card,
            }}
            rippleColor="rgba(255, 70, 86, .20)"
        >
            <ImageBackground style={{ flex: 1, padding: 16, position: "relative" }} source={{ uri: skinData.wallpaper }}>
                {!skinData.wallpaper && (
                    <Image
                        source={getContentTierIcon(skinData.contentTierUuid)}
                        blurRadius={2}
                        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: .1 }}
                    />
                )}
                <Text variant="titleLarge" numberOfLines={1}>
                    {themeData.data.displayName}
                </Text>
                {filteredDisplayName !== "" && (
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                        <Image source={{ uri: themeData.data.displayIcon }} style={{ width: 16, height: 16 }} />
                        <Text
                            variant="titleMedium"
                            style={{ flex: 1, opacity: .5, textTransform: "uppercase" }}
                            numberOfLines={1}
                        >
                            {filteredDisplayName}
                        </Text>
                    </View>
                )}
                <Image
                    resizeMode="center"
                    style={{ flex: 1, transform: [{ rotate: "22.5deg" }] }}
                    source={{ uri: skinData.displayIcon ?? skinData.chromas[0].displayIcon ?? skinData.chromas[0].fullRender }}
                />
                <CostPoint currencyId={Object.keys(item.Cost)[0]} cost={item.Cost[Object.keys(item.Cost)[0]]} />
            </ImageBackground>
        </TouchableRipple>
    );
};

export default CardItemOffer;
