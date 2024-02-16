import { Dimensions, ImageBackground, View } from "react-native";
// component
import Text from "@/component/typography/text";
// context
import { useAuthContext } from "@/context/hook/use-auth-context";
// type
import { BundleData } from "@/type/api/shop/bundle";
// util
import { secondsToDhms } from "@/util/format-time";

type Props = {
    bundle: BundleData;
    bundleIndex: number;
}

const { width } = Dimensions.get("screen");

const SlideItem = ({ bundle, bundleIndex }: Props) => {

    const { shop: { bundles: featuredBundle } } = useAuthContext();

    return (
        <ImageBackground
            source={{ uri: bundle.bundleInfo.displayIcon }}
            style={{
                width: width - 32,
                height: 200,
            }}
            borderRadius={16}
        >
            <View style={{ padding: 8 }}>
                <View style={{ flexDirection: "row" }}>
                    <Text>
                        FEATURED | {secondsToDhms(featuredBundle.Bundles[bundleIndex].DurationRemainingInSeconds)}
                    </Text>
                </View>
                <Text variant="headlineLarge" style={{ lineHeight: 40, fontWeight: "900" }}>
                    {bundle.bundleInfo.displayName}
                </Text>
            </View>
        </ImageBackground>
    );
};

export default SlideItem;
