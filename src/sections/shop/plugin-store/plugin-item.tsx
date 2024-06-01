import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
// sections
import OfferItem from "@/sections/shop/plugin-store/offer-item";
// types
import { PluginStore } from "@/types/api/shop/plugin-store";

type Props = {
    plugin: PluginStore;
};

const PluginItem = ({ plugin }: Props) => {
    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={plugin.PluginOffers.StoreOffers}
                contentContainerStyle={styles.flatListContent}
                renderItem={({ item, index }) => <OfferItem key={index} offer={item} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "relative",
    },
    flatListContent: {
        gap: 16,
    },
});

export default React.memo(PluginItem);
