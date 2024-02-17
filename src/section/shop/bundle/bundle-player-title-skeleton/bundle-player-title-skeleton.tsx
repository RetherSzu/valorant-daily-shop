import { MotiView } from "moti";
import { View } from "react-native";
import { Skeleton } from "moti/skeleton";

const BundlePlayerTitleSkeleton = () => (
    <MotiView
        transition={{ type: "timing" }}
        animate={{ backgroundColor: "#222429", borderRadius: 16, width: "100%", padding: 8, height: 204 }}
    >
        <View style={{ gap: 16, flex: 1, alignItems: "center" }}>
            <Skeleton colorMode="dark" width={150} height={100} />
            <Skeleton colorMode="dark" width="100%" height={40} />
        </View>
        <View style={{ flexDirection: "row", gap: 8, flex: 1, alignItems: "flex-end" }}>
            <Skeleton colorMode="dark" radius="round" width={24} height={24} />
            <Skeleton colorMode="dark" width={100} height={24} />
        </View>
    </MotiView>
);

export default BundlePlayerTitleSkeleton;
