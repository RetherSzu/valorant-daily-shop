import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { View } from "react-native";

const NightMarketCardSkeleton = () => (
    <MotiView
        transition={{ type: "timing" }}
        animate={{ backgroundColor: "#222429", borderRadius: 16, padding: 8, width: "100%" }}
    >
        <View style={{ gap: 16, flex: 1, height: 225 }}>
            <Skeleton colorMode="dark" width={200} />
            <Skeleton colorMode="dark" width={100} height={24} />
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", flex: 1 }}>
                <View style={{ gap: 8 }}>
                    <Skeleton colorMode="dark" width={50} height={24} />
                    <View style={{ flexDirection: "row", gap: 8 }}>
                        <Skeleton colorMode="dark" radius="round" width={24} height={24} />
                        <Skeleton colorMode="dark" width={100} height={24} />
                    </View>
                </View>
                <Skeleton colorMode="dark" radius="round" width={32} height={32} />
            </View>
        </View>
    </MotiView>
);

export default NightMarketCardSkeleton;
