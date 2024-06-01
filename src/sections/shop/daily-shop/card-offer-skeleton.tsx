import React, { useEffect } from "react";
import { Skeleton } from "moti/skeleton";
import { MotiView, useAnimationState } from "moti";
import { Dimensions, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");

const CardOfferSkeleton = () => {
    const animationState = useAnimationState({
        from: {
            opacity: 0.5,
            transform: [{ scale: 0.95 }],
            width: width / 2 - 24,
        },
        to: {
            opacity: 1,
            transform: [{ scale: 1 }],
            backgroundColor: "#222429",
            borderRadius: 16,
            padding: 8,
        },
    });

    useEffect(() => {
        animationState.transitionTo("to");
    }, [animationState]);

    return (
        <MotiView state={animationState}>
            <View style={styles.container}>
                <Skeleton colorMode="dark" width="100%" />
                <View style={styles.row}>
                    <Skeleton colorMode="dark" radius="round" width={24} height={24} />
                    <Skeleton colorMode="dark" width={width / 2 - 120} height={24} />
                </View>
                <View style={styles.flexEnd}>
                    <Skeleton colorMode="dark" width="100%" />
                </View>
            </View>
        </MotiView>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 16,
        flex: 1,
    },
    row: {
        flexDirection: "row",
        gap: 8,
    },
    flexEnd: {
        flex: 1,
        justifyContent: "flex-end",
    },
});

export default React.memo(CardOfferSkeleton);
