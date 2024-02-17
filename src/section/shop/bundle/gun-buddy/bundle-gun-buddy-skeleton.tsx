import { MotiView } from "moti";
import { View } from "react-native";
import { Skeleton } from "moti/skeleton";

const BundleGunBuddySkeleton = () => (
    <MotiView
        transition={{ type: "timing" }}
        animate={{ backgroundColor: "#222429", borderRadius: 16, width: "100%", padding: 8, height: 116 }}
    >
        <View style={{ gap: 8, flex: 1 }}>
            <Skeleton colorMode="dark" width={120} />
            <View style={{ flexDirection: "row", justifyContent: "space-between", flex: 1 }}>
                <View style={{ flexDirection: "row", gap: 8, flex: 1, alignItems: "flex-end" }}>
                    <Skeleton colorMode="dark" radius="round" width={24} height={24} />
                    <Skeleton colorMode="dark" width={100} height={24} />
                </View>
                <View style={{ justifyContent: "flex-end" }}>
                    <Skeleton colorMode="dark" radius={16} width={100} height={100} />
                </View>
            </View>
        </View>
    </MotiView>
);

export default BundleGunBuddySkeleton;
