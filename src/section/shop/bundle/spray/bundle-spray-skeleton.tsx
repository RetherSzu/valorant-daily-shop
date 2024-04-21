import { MotiView } from "moti";
import { StyleSheet, View } from "react-native";
// component
import DarkSkeleton from "@/component/skeleton/dark-skeleton";

const BundleSpraySkeleton = () => {
    return (
        <MotiView
            transition={{ type: "timing" }}
            animate={{ ...styles.motiViewAnimate }}
        >
            <View style={styles.container}>
                <DarkSkeleton width={100} />
                <View style={styles.iconRow}>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <DarkSkeleton key={index} radius={16} width={92} height={92} />
                    ))}
                </View>
                <View style={styles.actionRow}>
                    <DarkSkeleton radius="round" width={24} height={24} />
                    <DarkSkeleton width={100} height={24} />
                </View>
            </View>
        </MotiView>
    );
};

const styles = StyleSheet.create({
    motiViewAnimate: {
        backgroundColor: "#222429",
        borderRadius: 16,
        width: "100%",
        height: 220
    },
    container: {
        padding: 8,
        flex: 1,
        gap: 16
    },
    iconRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    actionRow: {
        flexDirection: "row",
        gap: 8,
        flex: 1,
        alignItems: "flex-end"
    }
});

export default BundleSpraySkeleton;
