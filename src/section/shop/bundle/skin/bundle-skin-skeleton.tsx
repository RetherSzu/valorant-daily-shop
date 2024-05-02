import { MotiView } from "moti";
import { StyleSheet, View } from "react-native";
// component
import DarkSkeleton from "@/component/skeleton/dark-skeleton";

const BundleSkinSkeleton = () => (
    <MotiView
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
                    <DarkSkeleton radius="round" width={32} height={32} />
                </View>
            </View>
        </View>
    </MotiView>
);

const styles = StyleSheet.create({
    motiViewAnimate: {
        backgroundColor: "#222429",
        borderRadius: 16,
        width: "100%",
        padding: 8,
        height: 174,
    },
    mainContainer: {
        gap: 8,
        flex: 1,
    },
    spacer: {
        height: 70,
    },
    footerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
    },
    actionLeftContainer: {
        flexDirection: "row",
        gap: 8,
        flex: 1,
        alignItems: "flex-end",
    },
    actionRightContainer: {
        justifyContent: "flex-end",
    },
});

export default BundleSkinSkeleton;
