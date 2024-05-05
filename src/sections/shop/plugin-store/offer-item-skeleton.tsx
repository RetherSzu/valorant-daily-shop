import React from "react";
import { ActivityIndicator, View } from "react-native";


const OfferItemSkeleton = () => {

    return (
        <View
            style={{
                height: 200,
                width: "100%",
                borderRadius: 16,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#FFFFFF33",
            }}
        >
            <ActivityIndicator size="large" color="#fff" />
        </View>
    );
};

export default OfferItemSkeleton;
