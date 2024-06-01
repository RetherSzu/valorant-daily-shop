import React, { useCallback, useMemo } from "react";
import { TouchableRipple } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Image, ImageBackground, View, StyleSheet } from "react-native";
// api
import { useGetSprayByIdQuery } from "@/api/rtk-valorant-api";
// components
import Error from "@/components/error/error";
import Text from "@/components/typography/text";
import CostPoint from "@/components/cost/cost-point";
import CardSpraySkeleton from "@/components/card/spray/card-spray-skeleton";
// contexts
import useThemeContext from "@/contexts/hook/use-theme-context";
// types
import { Offer } from "@/types/api/shop";
import { NavigationProp } from "@/types/router/navigation";
// utils
import { removeCardType } from "@/utils/format-string";

type CardSprayProps = {
    offer: Offer;
};

const CardSpray = ({ offer }: CardSprayProps) => {
    const navigate = useNavigation<NavigationProp>();
    const { colors } = useThemeContext();

    const {
        data: sprayData,
        error: sprayError,
        isLoading: isLoadingSpray,
    } = useGetSprayByIdQuery(offer.Rewards[0].ItemID);

    const onCardPress = useCallback(() => {
        if (sprayData) {
            navigate.navigate("SprayDetails", {
                spray: sprayData.data,
                offer,
            });
        }
    }, [navigate, sprayData, offer]);

    const renderSprays = useMemo(() => {
        if (!sprayData) return null;

        return [sprayData.data.fullIcon, sprayData.data.fullTransparentIcon, sprayData.data.displayIcon].map((iconUrl, index) => (
            <View key={index} style={styles.sprayImageContainer}>
                <Image
                    borderRadius={8}
                    source={{ uri: iconUrl }}
                    style={styles.sprayImage}
                    resizeMode="contain"
                />
            </View>
        ));
    }, [sprayData]);

    if (isLoadingSpray) {
        return <CardSpraySkeleton />;
    }

    if (sprayError || !sprayData) {
        return <Error />;
    }

    const spray = sprayData.data;

    return (
        <TouchableRipple
            borderless
            onPress={onCardPress}
            rippleColor="rgba(255, 70, 86, .20)"
            style={[styles.container, { backgroundColor: colors.card }]}
        >
            <ImageBackground
                style={styles.imageBackground}
                blurRadius={50}
                source={{ uri: spray.displayIcon }}
            >
                <Text variant="titleLarge" style={styles.title} numberOfLines={1}>
                    {removeCardType(spray.displayName, "spray")}
                </Text>
                <View style={styles.sprayContainer}>
                    {renderSprays}
                </View>
                <CostPoint currencyId={Object.keys(offer.Cost)[0]} cost={offer.Cost[Object.keys(offer.Cost)[0]]} />
            </ImageBackground>
        </TouchableRipple>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 16,
        overflow: "hidden",
    },
    imageBackground: {
        gap: 16,
        padding: 16,
    },
    title: {
        textTransform: "capitalize",
    },
    sprayContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    sprayImageContainer: {
        width: 92,
        height: 92,
    },
    sprayImage: {
        flex: 1,
        height: 70,
    },
});

export default React.memo(CardSpray);
