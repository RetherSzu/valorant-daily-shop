import React from "react";
import { MotiView } from "moti";
import { StyleSheet, View } from "react-native";
// components
import DarkSkeleton from "@/components/skeleton/dark-skeleton";

const CollectionCardSkeleton = () => (
    <MotiView
        // @ts-ignore
        transition={{ type: "timing" }}
        animate={styles.motiViewAnimate}
    >
        <View style={styles.mainContainer}>
            <DarkSkeleton width={150} />
            <DarkSkeleton width={100} height={24} />
            <View style={styles.spacer} />
        </View>
    </MotiView>
);

const styles = StyleSheet.create({
    motiViewAnimate: {
        height: 182,
        padding: 16,
        width: "100%",
        borderRadius: 16,
        backgroundColor: "#222429",
    },
    mainContainer: {
        gap: 8,
        flex: 1,
    },
    spacer: {
        height: 70,
    },
});

export default React.memo(CollectionCardSkeleton);
