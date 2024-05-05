import React from "react";
import { IconButton } from "react-native-paper";
import { FlatList, View } from "react-native";
// api
import { useGetBundleByIdQuery } from "@/api/rtk-valorant-api";
// components
import Text from "@/components/typography/text";
// contexts
import useThemeContext from "@/contexts/hook/use-theme-context";
// factory
import CardFactory from "@/factories/card-factory";
// types
import { PluginDetailScreenProps } from "@/types/router/navigation";

const Plugin = ({ route, navigation }: PluginDetailScreenProps) => {

    const { colors } = useThemeContext();

    const { plugin } = route.params;

    const { data, isLoading, error } = useGetBundleByIdQuery(plugin.PurchaseInformation.DataAssetID);

    if (isLoading) return <Text>Loading...</Text>;

    if (error || !data) return <Text>Error...</Text>;

    const goBack = () => navigation.goBack();

    const offerData = data.data;

    return (
        <View style={{ backgroundColor: colors.background, flex: 1, padding: 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <IconButton icon="arrow-left" iconColor="#fff" size={32} onPress={goBack} />
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text variant="titleLarge">{offerData.displayName}</Text>
                </View>
                <View style={{ width: 72, height: 72 }}></View>
            </View>
            <FlatList
                overScrollMode="never"
                data={plugin.SubOffers}
                snapToAlignment="center"
                style={{ marginTop: 16 }}
                contentContainerStyle={{ gap: 16 }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return <CardFactory offer={item.PurchaseInformation} key={index} />;
                }}
            />
        </View>
    );
};

export default Plugin;
