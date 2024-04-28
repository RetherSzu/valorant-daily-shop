import React from "react";
import { Animated, Dimensions, View } from "react-native";
// context
import useThemeContext from "@/context/hook/use-theme-context";
// type
import { BundleData, BundlesData } from "@/type/api/shop/bundle";

type Props = {
    data: BundlesData;
    scrollX: Animated.Value;
}

const { width } = Dimensions.get("screen");

const Pagination = ({ data, scrollX }: Props) => {

    const { colors } = useThemeContext();

    return (
        <View
            style={{
                position: "absolute",
                bottom: 16,
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            {data.map((_: BundleData, idx: number) => {
                const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [12, 30, 12],
                    extrapolate: "clamp"
                });

                const backgroundColor = scrollX.interpolate({
                    inputRange,
                    outputRange: [colors.text + "1A", colors.primary, colors.text + "1A"],
                    extrapolate: "clamp"
                });

                return (
                    <Animated.View
                        key={idx.toString()}
                        style={[
                            {
                                width: 12,
                                height: 12,
                                borderRadius: 6,
                                marginHorizontal: 3,
                                backgroundColor: "#ccc"
                            },
                            { width: dotWidth, backgroundColor }
                        ]}
                    />
                );
            })}
        </View>
    );
};

export default Pagination;
