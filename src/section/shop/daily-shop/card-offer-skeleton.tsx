import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { Dimensions, View } from "react-native";

const width = Dimensions.get("window").width;

const CardOfferSkeleton = () => (
    <MotiView
        transition={{
            type: "timing"
        }}
        animate={{ backgroundColor: "#222429", borderRadius: 16, width: width / 2 - 24, padding: 8 }}
    >
        <View style={{ gap: 16, flex: 1 }}>
            <Skeleton colorMode="dark" width="100%" />
            <View style={{ flexDirection: "row", gap: 8 }}>
                <Skeleton colorMode="dark" radius="round" width={24} height={24} />
                <Skeleton colorMode="dark" width={width / 2 - 120} height={24} />
            </View>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <Skeleton colorMode="dark" width="100%" />
            </View>
        </View>
    </MotiView>
);

export default CardOfferSkeleton;
