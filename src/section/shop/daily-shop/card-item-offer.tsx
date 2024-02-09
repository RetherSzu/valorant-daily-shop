import { Text } from "react-native-paper";
import { Image, View } from "react-native";
import { ReactElement, useEffect, useState } from "react";
// api
import valorantProvider from "@/api/valorant-provider";
// component
import Loading from "@/component/loading/loading";
// context
import { useThemeContext } from "@/context/hook/use-theme-context";
// type
import { ItemStoreOffer } from "@/type/api/shop";
import { WeaponSkin } from "@/type/api/shop/weapon-skin";
import { WeaponTheme } from "@/type/api/shop/weapon-theme";
// util
import { getContentTierIcon } from "@/util/content-tier-icon";

type Props = {
    item: ItemStoreOffer;
}

const CardItemOffer = ({ item }: Props): ReactElement => {

    const { colors } = useThemeContext();

    const [skinData, setSkinData] = useState<WeaponSkin>({
        uuid: "",
        levels: [],
        chromas: [],
        wallpaper: "",
        themeUuid: "",
        displayName: "",
        displayIcon: "",
        contentTierUuid: ""
    });

    const [themeData, setThemeData] = useState<WeaponTheme>({
        uuid: "",
        displayName: "",
        displayIcon: "",
        storeFeaturedImage: ""
    });

    useEffect(() => {
        const getWeaponData = async () => {
            try {
                const response = await valorantProvider.getWeaponLevelById(item.Rewards[0].ItemID);
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

    if (!skinData.uuid || !themeData.uuid) {
        return <Loading />;
    }

    return (
        <View
            className="flex-1 bg-[#222429] p-2"
            style={{ position: "relative", overflow: "hidden", borderRadius: 16 }}
        >
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
            <Text variant="titleLarge" style={{ color: colors.text, fontWeight: "bold" }} numberOfLines={1}>
                {skinData.displayName.replace(themeData.displayName, "").replace(/\s/g, "")}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Image source={{ uri: themeData.displayIcon }} style={{ width: 24, height: 24 }} />
                <Text variant="labelLarge" style={{ flex: 1, color: colors.text, opacity: .5 }} numberOfLines={1}>
                    {themeData.displayName}
                </Text>
            </View>
            <Image
                source={{ uri: skinData.displayIcon ?? skinData.chromas[0].displayIcon }}
                style={{ flex: 1, transform: [{ rotate: "22.5deg" }, { scale: 1.25 }] }}
                resizeMode="center"
            />
            <View className="flex-row gap-2 items-center pt-4">
                <Image
                    source={require("../../../../assets/valorant-point.png")}
                    resizeMode="contain"
                    style={{ width: 24, height: 24 }}
                />
                <Text variant="titleMedium" style={{ color: colors.text }}>
                    {item.Cost[Object.keys(item.Cost)[0]]}
                </Text>
            </View>
        </View>
    );
};

export default CardItemOffer;
