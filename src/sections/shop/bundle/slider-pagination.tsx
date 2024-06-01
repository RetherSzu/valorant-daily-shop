import React from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
// contexts
import useThemeContext from "@/contexts/hook/use-theme-context";
// types
import { BundleData, BundlesData } from "@/types/api/shop/bundle";

type Props = {
    data: BundlesData;
    scrollX: Animated.Value;
};

const { width } = Dimensions.get("screen");

const Pagination = ({ data, scrollX }: Props) => {
    const { colors } = useThemeContext();

    return (
        <View style={styles.container}>
            {data.map((_: BundleData, idx: number) => {
                const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [12, 30, 12],
                    extrapolate: "clamp",
                });

                const backgroundColor = scrollX.interpolate({
                    inputRange,
                    outputRange: [`${colors.text}1A`, colors.primary, `${colors.text}1A`],
                    extrapolate: "clamp",
                });

                return (
                    <Animated.View
                        key={idx.toString()}
                        style={[
                            styles.dot,
                            { width: dotWidth, backgroundColor },
                        ]}
                    />
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 16,
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    dot: {
        height: 12,
        borderRadius: 6,
        marginHorizontal: 3,
    },
});

export default React.memo(Pagination);
