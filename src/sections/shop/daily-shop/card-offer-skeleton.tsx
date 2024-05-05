import { useEffect } from "react";
import { Skeleton } from "moti/skeleton";
import { Dimensions, View } from "react-native";
import { MotiView, useAnimationState } from "moti";

const width = Dimensions.get("window").width;

const CardOfferSkeleton = () => {

    const animationState = useAnimationState({
        from: {
            opacity: 0.5,
            transform: [{ scale: 0.95 }],
            width: width / 2 - 24
        },
        to: {
            opacity: 1,
            transform: [{ scale: 1 }],
            backgroundColor: "#222429",
            borderRadius: 16,
            padding: 8
        }
    });

    useEffect(() => {
        animationState.transitionTo("to");
    }, [animationState]);

    return (
        <MotiView state={animationState}>
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
};

export default CardOfferSkeleton;
