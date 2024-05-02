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
                <View style={styles.rowJustifySpaceBetween}>
                    <DarkSkeleton radius={16} width={100} height={100} />
                    <DarkSkeleton radius={16} width={100} height={100} />
                </View>
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
        backgroundColor: "#222429",
        borderRadius: 16,
        width: "100%",
        height: 220,
    },
    row: {
        flexDirection: "row",
        flex: 1,
    },
    leftColumn: {
        padding: 8,
        flex: 1,
    },
    rowJustifySpaceBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    bottomRow: {
        flexDirection: "row",
        alignItems: "flex-end",
        marginTop: 8,
    },
});

export default BundleCardSkeleton;
