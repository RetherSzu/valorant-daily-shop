import React, { useMemo } from "react";
import { TouchableRipple } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, ImageBackground, StyleSheet, View } from "react-native";
// components
import Text from "@/components/typography/text";
import CostPoint from "@/components/cost/cost-point";
import SvgLeftArrow from "@/components/icon/left-arrow";
import SvgRightArrow from "@/components/icon/right-arrow";
// contexts
import useThemeContext from "@/contexts/hook/use-theme-context";
import useBundleContext from "@/contexts/hook/use-bundle-context";
// types
import { BundleData } from "@/types/api/shop/bundle";
// utils
import { secondsToDhms } from "@/utils/format-time";

type Props = {
    bundle: BundleData;
    bundleIndex: number;
    nextIndex: number;
    prevIndex: number;
    next: () => void;
    prev: () => void;
};

const { width } = Dimensions.get("screen");

const SlideItem = ({ bundle, bundleIndex, nextIndex = -1, prevIndex = -1, next, prev }: Props) => {
    const { bundles: featuredBundle } = useBundleContext();

    const cost = useMemo(() => {
        const costs = featuredBundle.Bundles[bundleIndex]?.TotalDiscountedCost;
        if (!costs || Object.keys(costs).length === 0) {
            return 0;
        }
        const firstKey = Object.keys(costs)[0];
        return costs[firstKey];
    }, [featuredBundle, bundleIndex]);

    const { colors } = useThemeContext();

    const minusNext = nextIndex === -1 ? 0 : 64;
    const minusPrev = prevIndex === -1 ? 0 : 64;

    if (bundle.bundleInfo === undefined) {
        return null;
    }

    return (
        <View style={{ flexDirection: "row", backgroundColor: colors.primary, borderRadius: 16 }}>
            {prevIndex !== -1 && (
                <TouchableRipple
                    style={[styles.leftButton, { backgroundColor: colors.primary }]}
                    onPress={prev}
                    underlayColor="#222429"
                >
                    <SvgLeftArrow color="white" width={32} height={32} />
                </TouchableRipple>
            )}
            <ImageBackground
                style={[styles.imageBackground, { width: width - 32 - minusNext - minusPrev }]}
                source={{ uri: bundle.bundleInfo.displayIcon }}
                imageStyle={styles.image}
            >
                <LinearGradient
                    style={styles.content}
                    colors={[
                        "rgba(0, 0, 0, 0.5)",
                        "rgba(0, 0, 0, 0)",
                        "rgba(0, 0, 0, 0)",
                    ]}
                >
                    <View>
                        <Text variant="bodyLarge">
                            FEATURED | {secondsToDhms(featuredBundle.Bundles[bundleIndex].DurationRemainingInSeconds)}
                        </Text>
                        <Text variant="headlineLarge" style={styles.headline}>
                            {bundle.bundleInfo.displayName}
                        </Text>
                    </View>
                    <CostPoint currencyId="vp" cost={cost} />
                </LinearGradient>
            </ImageBackground>
            {nextIndex !== -1 && (
                <TouchableRipple
                    style={[styles.rightButton, { backgroundColor: colors.primary }]}
                    onPress={next}
                    underlayColor="#222429"
                >
                    <SvgRightArrow color="white" width={32} height={32} />
                </TouchableRipple>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    imageBackground: {
        height: 200,
    },
    image: {
        borderRadius: 16,
    },
    content: {
        flex: 1,
        padding: 8,
        borderRadius: 16,
        justifyContent: "space-between",
    },
    headline: {
        fontFamily: "Vandchrome",
    },
    leftButton: {
        width: 64,
        alignItems: "center",
        justifyContent: "center",
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
    },
    rightButton: {
        width: 64,
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
    }
});

export default React.memo(SlideItem);
