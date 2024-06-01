import React from "react";
import { MotiView } from "moti";
import { StyleSheet, View } from "react-native";
// components
import DarkSkeleton from "@/components/skeleton/dark-skeleton";

const CardTitleSkeleton = () => (
    <MotiView
        // @ts-ignore
        transition={{ type: "timing" }}
        animate={styles.motiViewAnimate}
    >
        <View style={styles.centerAligned}>
            <DarkSkeleton width={150} height={100} />
            <DarkSkeleton width="100%" height={40} />
        </View>
        <View style={styles.rowAligned}>
            <DarkSkeleton radius="round" width={24} height={24} />
            <DarkSkeleton width={100} height={24} />
        </View>
    </MotiView>
);

const styles = StyleSheet.create({
    motiViewAnimate: {
        backgroundColor: "#222429",
        borderRadius: 16,
        width: "100%",
        padding: 8,
        height: 204,
    },
    centerAligned: {
        gap: 16,
        flex: 1,
        alignItems: "center",
    },
    rowAligned: {
        flexDirection: "row",
        gap: 8,
        flex: 1,
        alignItems: "flex-end",
    },
});

export default React.memo(CardTitleSkeleton);
