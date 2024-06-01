import React from "react";
import { Image, ImageBackground, View, StyleSheet } from "react-native";
// api
import { useGetTitleByIdQuery } from "@/api/rtk-valorant-api";
// components
import Error from "@/components/error/error";
import Text from "@/components/typography/text";
import CostPoint from "@/components/cost/cost-point";
import CardTitleSkeleton from "@/components/card/player-title/card-title-skeleton";
// contexts
import useThemeContext from "@/contexts/hook/use-theme-context";
// types
import { Offer } from "@/types/api/shop";

type Props = {
    offer: Offer;
};

const CardTitle = ({ offer }: Props) => {
    const { colors } = useThemeContext();

    const {
        data: titleData,
        error: titleError,
        isLoading: isLoadingTitle,
    } = useGetTitleByIdQuery(offer.Rewards[0].ItemID);

    if (isLoadingTitle) {
        return <CardTitleSkeleton />;
    }

    if (titleError || !titleData) {
        return <Error />;
    }

    const playerTitle = titleData.data;

    return (
        <ImageBackground
            source={require("@/assets/player-title.png")}
            style={[styles.container, { backgroundColor: colors.card }]}
            blurRadius={150}
        >
            <View style={styles.imageContainer}>
                <Image source={require("@/assets/player-title.png")} style={styles.image} />
            </View>
            <Text
                variant="titleLarge"
                style={styles.titleText}
                numberOfLines={1}
            >
                {playerTitle.displayName.replace(" Title", "")}
            </Text>
            <CostPoint currencyId={Object.keys(offer.Cost)[0]} cost={offer.Cost[Object.keys(offer.Cost)[0]]} />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 16,
        padding: 8,
        borderRadius: 16,
        overflow: "hidden",
        flexDirection: "column",
    },
    imageContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 150,
        height: 100,
    },
    titleText: {
        padding: 8,
        borderRadius: 8,
        textAlign: "center",
        backgroundColor: "rgba(0,0,0,0.1)",
    },
});

export default React.memo(CardTitle);
