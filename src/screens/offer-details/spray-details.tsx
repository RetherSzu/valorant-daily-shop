import React from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
// components
import Text from "@/components/typography/text";
import CostPoint from "@/components/cost/cost-point";
// contexts
import useThemeContext from "@/contexts/hook/use-theme-context";
// types
import { SprayDetailScreenProps } from "@/types/router/navigation";

const WIDTH = Dimensions.get("window").width;

const SprayDetails = ({ route }: SprayDetailScreenProps) => {

    const { spray, offer } = route.params;

    const { colors } = useThemeContext();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View>
                <Text variant="displayLarge" style={styles.displayName}>
                    {spray.displayName.toLowerCase().replace("spray", "").trim()}
                </Text>
                <Text variant="titleLarge" style={styles.sprayText}>
                    SPRAY
                </Text>
            </View>
            <CostPoint currencyId={Object.keys(offer.Cost)[0]} cost={offer.Cost[Object.keys(offer.Cost)[0]]} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
            >
                {[spray.fullTransparentIcon, spray.fullIcon].map((icon, index) => (
                    <View key={index} style={[styles.iconContainer, { backgroundColor: colors.card }]}>
                        <Image
                            borderRadius={16}
                            resizeMode="contain"
                            source={{ uri: icon }}
                            style={styles.image}
                        />
                    </View>
                ))}
            </ScrollView>
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
    sprayText: {
        opacity: 0.5,
        textTransform: "uppercase",
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        gap: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    iconContainer: {
        borderRadius: 32,
        padding: 16,
    },
    image: {
        width: WIDTH - 64,
        height: WIDTH - 64,
    },
});

export default React.memo(SprayDetails);
