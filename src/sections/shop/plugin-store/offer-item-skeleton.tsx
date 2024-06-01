import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const OfferItemSkeleton = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#fff" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: "100%",
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF33",
    },
});

export default React.memo(OfferItemSkeleton);
