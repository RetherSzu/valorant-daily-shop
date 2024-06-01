import React from "react";
import { MotiView } from "moti";
import { StyleSheet, View } from "react-native";
// components
import DarkSkeleton from "@/components/skeleton/dark-skeleton";

const CardSkinSkeleton = () => (
    <MotiView
        // @ts-ignore
        transition={{ type: "timing" }}
        animate={styles.motiViewAnimate}
    >
        <View style={styles.mainContainer}>
            <DarkSkeleton width={150} />
            <DarkSkeleton width={100} height={24} />
            <View style={styles.spacer} />
            <View style={styles.footerContainer}>
                <View style={styles.actionLeftContainer}>
                    <DarkSkeleton radius="round" width={24} height={24} />
                    <DarkSkeleton width={100} height={24} />
                </View>
                <View style={styles.actionRightContainer}>
                    <DarkSkeleton radius={8} width={32} height={32} />
                </View>
            </View>
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
    footerContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    actionLeftContainer: {
        gap: 8,
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-end",
    },
    actionRightContainer: {
        justifyContent: "flex-end",
    },
});

export default React.memo(CardSkinSkeleton);
