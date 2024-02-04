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
        <View className="flex-1 bg-[#222429] rounded-3xl p-4">
            <Text variant="titleMedium" style={{ color: colors.text }}>{skinData.displayName}</Text>
            <Text variant="labelLarge" style={{ color: colors.text, opacity: .5 }} className="pb-4">{themeData.displayName}</Text>
            <Image source={{ uri: skinData.displayIcon }} className="flex-1 rotate-45 scale-110" resizeMode="center" />
            <View className="flex-row gap-4 items-center pt-4">
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
