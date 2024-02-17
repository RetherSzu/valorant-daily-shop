import { MotiView } from "moti";
import { View } from "react-native";
import { Skeleton } from "moti/skeleton";

const BundleSpraySkeleton = () => (
    <MotiView
        transition={{ type: "timing" }}
        animate={{ backgroundColor: "#222429", borderRadius: 16, width: "100%", height: 220 }}
    >
        <View style={{ padding: 8, flex: 1, gap: 16 }}>
            <Skeleton colorMode="dark" width={100} />
            <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                <Skeleton colorMode="dark" radius={16} width={92} height={92} />
                <Skeleton colorMode="dark" radius={16} width={92} height={92} />
                <Skeleton colorMode="dark" radius={16} width={92} height={92} />
            </View>
            <View style={{ flexDirection: "row", gap: 8, flex: 1, alignItems: "flex-end" }}>
                <Skeleton colorMode="dark" radius="round" width={24} height={24} />
                <Skeleton colorMode="dark" width={100} height={24} />
            </View>
        </View>
    </MotiView>
);

export default BundleSpraySkeleton;
