import React from "react";
import { IconButton } from "react-native-paper";
import { FlatList, Image, View } from "react-native";
// api
import { useGetBundleByIdQuery } from "@/api/rtk-valorant-api";
// component
import Text from "@/component/typography/text";
// context
import { useThemeContext } from "@/context/hook/use-theme-context";
// section
import BundleSkin from "@/section/shop/bundle/skin/bundle-skin";
import BundleCard from "@/section/shop/bundle/bundle-card/bundle-card";
import BundleSpray from "@/section/shop/bundle/bundle-spray/bundle-spray";
import BundleGunBuddy from "@/section/shop/bundle/gun-buddy/bundle-gun-buddy";
import BundlePlayerTitle from "@/section/shop/bundle/bundle-player-title-skeleton/bundle-player-title";

const Plugin = ({ route, navigation }) => {

    const { colors } = useThemeContext();

    const { plugin } = route.params;

    const { data, isLoading, error } = useGetBundleByIdQuery(plugin.PurchaseInformation.DataAssetID);

    if (isLoading) return <Text>Loading...</Text>;

    if (error || !data) return <Text>Error...</Text>;

    const goBack = () => navigation.goBack();

    const offerData = data.data;

    return (
        <View style={{ backgroundColor: colors.background, flex: 1, padding: 16, gap: 16 }}>
            <IconButton icon="arrow-left" iconColor="#fff" size={32} onPress={goBack} />
            <View style={{ overflow: "hidden", width: "100%", height: 200, borderRadius: 16 }}>
                <Image
                    source={{ uri: offerData.displayIcon }}
                    resizeMode="cover"
                    style={{ width: "100%", height: "100%" }}
                />
            </View>
            <FlatList
                overScrollMode="never"
                snapToAlignment="center"
                contentContainerStyle={{ gap: 16 }}
                showsVerticalScrollIndicator={false}
                data={plugin.SubOffers}
                renderItem={({ item, index }) => {
                    switch (item.PurchaseInformation.Rewards[0].ItemTypeID) {
                        case "d5f120f8-ff8c-4aac-92ea-f2b5acbe9475": // Sprays
                            return <BundleSpray offer={item.PurchaseInformation} key={index} />;
                        case "dd3bf334-87f3-40bd-b043-682a57a8dc3a": // Gun Buddies
                            return <BundleGunBuddy offer={item.PurchaseInformation} key={index} />;
                        case "3f296c07-64c3-494c-923b-fe692a4fa1bd": // Cards
                            return <BundleCard offer={item.PurchaseInformation} key={index} />;
                        case "e7c63390-eda7-46e0-bb7a-a6abdacd2433": // Skins
                            return <BundleSkin offer={item.PurchaseInformation} key={index} />;
                        case "de7caa6b-adf7-4588-bbd1-143831e786c6": // Titles
                            return <BundlePlayerTitle offer={item.PurchaseInformation} key={index} />;
                        default:
                            return <BundleSkin offer={item.PurchaseInformation} key={index} />;
                    }
                }}
            />
        </View>
    );
};

export default Plugin;
