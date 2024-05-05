import { MotiView } from "moti";
import { StyleSheet, View } from "react-native";
// component
import DarkSkeleton from "@/component/skeleton/dark-skeleton";

const CardSpraySkeleton = () => {
    return (
        <MotiView
            transition={{ type: "timing" }}
            animate={{ ...styles.motiViewAnimate }}
        >
            <View style={styles.container}>
                <DarkSkeleton width={100} />
                <View style={styles.iconRow}>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <DarkSkeleton key={index} radius={8} width={92} height={92} />
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
        height: 208,
        width: "100%",
        borderRadius: 16,
        backgroundColor: "#222429",
    },
    container: {
        gap: 16,
        flex: 1,
        padding: 16,
    },
    iconRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    actionRow: {
        gap: 8,
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-end",
    },
});

export default CardSpraySkeleton;
