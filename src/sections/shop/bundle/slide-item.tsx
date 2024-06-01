import React, { useMemo } from "react";
import { Dimensions, ImageBackground, StyleSheet, View } from "react-native";
// components
import Text from "@/components/typography/text";
import CostPoint from "@/components/cost/cost-point";
// contexts
import useBundleContext from "@/contexts/hook/use-bundle-context";
// types
import { BundleData } from "@/types/api/shop/bundle";
// utils
import { secondsToDhms } from "@/utils/format-time";

type Props = {
    bundle: BundleData;
    bundleIndex: number;
};

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
            style={styles.imageBackground}
            imageStyle={styles.image}
        >
            <View style={styles.content}>
                <View>
                    <Text variant="bodyLarge">
                        FEATURED | {secondsToDhms(featuredBundle.Bundles[bundleIndex].DurationRemainingInSeconds)}
                    </Text>
                    <Text variant="headlineLarge" style={styles.headline}>
                        {bundle.bundleInfo.displayName}
                    </Text>
                </View>
                <CostPoint currencyId="vp" cost={cost} />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    imageBackground: {
        height: 200,
        width: width - 32,
    },
    image: {
        borderRadius: 16,
    },
    content: {
        padding: 8,
        justifyContent: "space-between",
        flex: 1,
    },
    headline: {
        fontFamily: "Vandchrome",
    },
});

export default React.memo(SlideItem);
