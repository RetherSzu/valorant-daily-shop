import { MotiView } from "moti";
import { View } from "react-native";
import { Skeleton } from "moti/skeleton";

const BundleCardSkeleton = () => (
    <MotiView
        transition={{ type: "timing" }}
        animate={{ backgroundColor: "#222429", borderRadius: 16, width: "100%", height: 220 }}
    >
        <View style={{ flexDirection: "row", flex: 1, gap: 16 }}>
            <View style={{ padding: 8, flex: 1, gap: 16 }}>
                <Skeleton colorMode="dark" width={100} />
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Skeleton colorMode="dark" radius={16} width={100} height={100} />
                    <Skeleton colorMode="dark" radius={16} width={100} height={100} />
                </View>
                <View style={{ flexDirection: "row", gap: 8, flex: 1, alignItems: "flex-end" }}>
                    <Skeleton colorMode="dark" radius="round" width={24} height={24} />
                    <Skeleton colorMode="dark" width={100} height={24} />
                </View>
            </View>
            <Skeleton colorMode="dark" width={92} height={220} />
        </View>
    </MotiView>
);

export default BundleCardSkeleton;
