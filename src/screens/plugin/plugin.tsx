import React, { useCallback } from "react";
import { IconButton } from "react-native-paper";
import { FlatList, StyleSheet, View } from "react-native";
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

    const goBack = useCallback(() => navigation.goBack(), [navigation]);

    if (isLoading) return <Text>Loading...</Text>;
    if (error || !data) return <Text>Error...</Text>;

    const offerData = data.data;

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <IconButton icon="arrow-left" iconColor="#fff" size={32} onPress={goBack} />
                <View style={styles.titleContainer}>
                    <Text variant="titleLarge">{offerData.displayName}</Text>
                </View>
                <View style={styles.placeholder} />
            </View>
            <FlatList
                overScrollMode="never"
                data={plugin.SubOffers}
                snapToAlignment="center"
                style={styles.list}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <CardFactory offer={item.PurchaseInformation} key={index} />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
    },
    titleContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    placeholder: {
        width: 72,
        height: 72,
    },
    list: {
        marginTop: 16,
    },
    listContent: {
        gap: 16,
    },
});

export default React.memo(Plugin);
