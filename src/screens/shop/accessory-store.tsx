import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
// components
import Text from "@/components/typography/text";
// contexts
import useAccessoryStoreContext from "@/contexts/hook/use-accessory-store-context";
// factory
import CardFactory from "@/factories/card-factory";
// utils
import { secondsToDhms } from "@/utils/format-time";

const AccessoryStore = () => {

    const { accessoryStore } = useAccessoryStoreContext();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text variant="titleMedium">NEXT OFFER:</Text>
                <Text
                    variant="titleMedium"
                    style={styles.timeText}
                    key={accessoryStore.AccessoryStoreRemainingDurationInSeconds}
                >
                    {secondsToDhms(accessoryStore.AccessoryStoreRemainingDurationInSeconds)}
                </Text>
            </View>

            <FlatList
                style={styles.list}
                showsVerticalScrollIndicator={false}
                data={accessoryStore.AccessoryStoreOffers}
                contentContainerStyle={styles.listContent}
                renderItem={({ item, index }) => <CardFactory key={index} offer={item.Offer} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 16,
        paddingHorizontal: 16,
        gap: 8,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    timeText: {
        color: "#E5E1B2",
    },
    listContent: {
        gap: 16,
    },
    list: {
        flex: 1,
    },
});

export default React.memo(AccessoryStore);
