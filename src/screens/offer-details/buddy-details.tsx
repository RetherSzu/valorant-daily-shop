import React from "react";
import { Image, StyleSheet, View } from "react-native";
// components
import Text from "@/components/typography/text";
import CostPoint from "@/components/cost/cost-point";
// types
import { BuddyDetailScreenProps } from "@/types/router/navigation";

const BuddyDetails = ({ route }: BuddyDetailScreenProps) => {
    const { buddy, offer } = route.params;

    return (
        <View style={styles.container}>
            <Text variant="displayLarge" style={styles.displayName}>
                {buddy.displayName.toLowerCase().replace("buddy", "").trim()}
            </Text>
            <Text variant="titleLarge" style={styles.buddyText}>
                BUDDY
            </Text>
            <CostPoint currencyId={Object.keys(offer.Cost)[0]} cost={offer.Cost[Object.keys(offer.Cost)[0]]} />
            <View style={styles.imageContainer}>
                <Image
                    resizeMode="contain"
                    source={{ uri: buddy.displayIcon }}
                    style={styles.image}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        gap: 16,
    },
    displayName: {
        fontFamily: "Vandchrome",
    },
    buddyText: {
        opacity: 0.5,
        textTransform: "uppercase",
    },
    imageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 256,
        height: 256,
    },
});

export default React.memo(BuddyDetails);
