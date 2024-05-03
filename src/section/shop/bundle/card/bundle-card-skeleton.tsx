import { MotiView } from "moti";
import { StyleSheet, View } from "react-native";
// component
import DarkSkeleton from "@/component/skeleton/dark-skeleton";

const BundleCardSkeleton = () => (
    <MotiView
        transition={{ type: "timing" }}
        animate={styles.motiViewAnimate}
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

const styles = StyleSheet.create({
    motiViewAnimate: {
        height: 220,
        width: "100%",
        borderRadius: 16,
        backgroundColor: "#222429",
    },
    row: {
        flex: 1,
        flexDirection: "row",
    },
    leftColumn: {
        flex: 1,
        gap: 16,
        padding: 16,
    },
    rowJustifySpaceBetween: {
        marginBottom: 8,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    bottomRow: {
        gap: 8,
        flexDirection: "row",
        alignItems: "flex-end",
    },
});

export default BundleCardSkeleton;
