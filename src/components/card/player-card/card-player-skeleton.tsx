import React from "react";
import { MotiView } from "moti";
import { StyleSheet, View } from "react-native";
// components
import DarkSkeleton from "@/components/skeleton/dark-skeleton";

const CardPlayerSkeleton = () => (
    <MotiView
        // @ts-ignore
        transition={{ type: "timing" }}
        // @ts-ignore
        animate={motiViewAnimateStyle}
    >
        <View style={styles.row}>
            <View style={styles.leftColumn}>
                <DarkSkeleton width={100} />
                <DarkSkeleton radius={8} width="100%" height={100} />
                <View style={styles.bottomRow}>
                    <DarkSkeleton radius="round" width={24} height={24} />
                    <DarkSkeleton width={100} height={24} />
                </View>
            </View>
            <DarkSkeleton width={92} height={220} />
        </View>
    </MotiView>
);

const motiViewAnimateStyle = {
    height: 220,
    width: "100%",
    borderRadius: 16,
    backgroundColor: "#222429",
};

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: "row",
    },
    leftColumn: {
        flex: 1,
        gap: 16,
        padding: 16,
    },
    bottomRow: {
        gap: 8,
        flexDirection: "row",
        alignItems: "flex-end",
    },
});

export default React.memo(CardPlayerSkeleton);
