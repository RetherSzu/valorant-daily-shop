import { MotiView } from "moti";
import { StyleSheet, View } from "react-native";
// components
import DarkSkeleton from "@/components/skeleton/dark-skeleton";

const CardBuddySkeleton = () => (
    <MotiView
        transition={{ type: "timing" }}
        animate={styles.motiViewAnimate}
    >
        <View style={styles.container}>
            <DarkSkeleton width={120} />
            <View style={styles.footer}>
                <View style={styles.actionArea}>
                    <DarkSkeleton radius="round" width={24} height={24} />
                    <DarkSkeleton width={100} height={24} />
                </View>
                <View style={styles.endIcon}>
                    <DarkSkeleton radius={8} width={100} height={100} />
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
        padding: 16,
        height: 132
    },
    container: {
        gap: 8,
        flex: 1
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1
    },
    actionArea: {
        flexDirection: "row",
        gap: 8,
        flex: 1,
        alignItems: "flex-end"
    },
    endIcon: {
        justifyContent: "flex-end"
    }
});

export default CardBuddySkeleton;
