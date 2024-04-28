import { useMemo } from "react";
import { Dimensions, ImageBackground, View } from "react-native";
// component
import Text from "@/component/typography/text";
// context
import useBundleContext from "@/context/hook/use-bundle-context";
// section
import CostPoint from "@/section/shop/cost-point";
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

    const { bundles: featuredBundle } = useBundleContext();

    const cost = useMemo(() => {
        const costs = featuredBundle.Bundles[bundleIndex]?.TotalBaseCost;
        if (!costs || Object.keys(costs).length === 0) {
            return 0;
        }
        const firstKey = Object.keys(costs)[0];
        return costs[firstKey];
    }, [featuredBundle, bundleIndex]);

    return (
        <ImageBackground
            source={{ uri: bundle.bundleInfo.displayIcon }}
            style={{
                width: width - 32,
                height: 200,
            }}
            borderRadius={16}
        >
            <View style={{ padding: 8, justifyContent: "space-between", flex: 1 }}>
                <View style={{ display: "flex" }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text variant="bodyLarge">
                            FEATURED | {secondsToDhms(featuredBundle.Bundles[bundleIndex].DurationRemainingInSeconds)}
                        </Text>
                    </View>
                    <Text variant="headlineLarge" style={{ fontFamily: "Vandchrome" }}>
                        {bundle.bundleInfo.displayName}
                    </Text>
                </View>
                <CostPoint currencyId="vp" cost={cost} />
            </View>
        </ImageBackground>
    );
};

export default SlideItem;
