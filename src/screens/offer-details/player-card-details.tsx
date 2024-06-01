import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
// components
import Text from "@/components/typography/text";
import CostPoint from "@/components/cost/cost-point";
// types
import { PlayerCardDetailScreenProps } from "@/types/router/navigation";

const WIDTH = Dimensions.get("window").width;

const PlayerCardDetails = ({ route }: PlayerCardDetailScreenProps) => {
    const { playercard, offer } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.mainContent}>
                <Image
                    borderRadius={16}
                    resizeMode="cover"
                    source={{ uri: playercard.largeArt }}
                    style={styles.largeArt}
                />
                <View style={styles.detailsContainer}>
                    <View style={styles.textContainer}>
                        <Text variant="headlineLarge" style={styles.displayName}>
                            {playercard.displayName.toLowerCase().replace("card", "").trim()}
                        </Text>
                        <Text variant="titleLarge" style={styles.cardText}>
                            CARD
                        </Text>
                        <CostPoint
                            currencyId={Object.keys(offer.Cost)[0]}
                            cost={offer.Cost[Object.keys(offer.Cost)[0]]}
                        />
                    </View>
                    <Image
                        borderRadius={16}
                        resizeMode="contain"
                        source={{ uri: playercard.smallArt }}
                        style={styles.smallArt}
                    />
                </View>
            </View>
            <Image
                borderRadius={16}
                resizeMode="cover"
                source={{ uri: playercard.wideArt }}
                style={styles.wideArt}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        gap: 16,
    },
    mainContent: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
    },
    largeArt: {
        width: WIDTH / 2,
        height: "100%",
    },
    detailsContainer: {
        gap: 16,
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
    },
    textContainer: {
        gap: 8,
        width: "100%",
        flex: 1,
        justifyContent: "flex-start",
    },
    displayName: {
        fontFamily: "Vandchrome",
    },
    cardText: {
        opacity: 0.5,
        textTransform: "uppercase",
    },
    smallArt: {
        width: WIDTH / 2 - 48,
        height: WIDTH / 2 - 48,
    },
    wideArt: {
        width: WIDTH - 32,
        height: 128,
    },
});

export default React.memo(PlayerCardDetails);
