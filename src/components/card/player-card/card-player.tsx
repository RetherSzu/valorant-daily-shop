import React, { useCallback } from "react";
import { TouchableRipple } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
// api
import { useGetPlayerCardIdQuery } from "@/api/rtk-valorant-api";
// components
import Error from "@/components/error/error";
import Text from "@/components/typography/text";
import CostPoint from "@/components/cost/cost-point";
import CardPlayerSkeleton from "@/components/card/player-card/card-player-skeleton";
// contexts
import useThemeContext from "@/contexts/hook/use-theme-context";
// types
import { Offer } from "@/types/api/shop";
import { NavigationProp } from "@/types/router/navigation";
// utils
import { removeCardType } from "@/utils/format-string";

type CardPlayerProps = {
    offer: Offer;
};

const CardPlayer = ({ offer }: CardPlayerProps) => {

    const { colors } = useThemeContext();

    const navigate = useNavigation<NavigationProp>();

    const {
        data: playerCardData,
        error: playerCardError,
        isLoading: isLoadingCard,
    } = useGetPlayerCardIdQuery(offer.Rewards[0].ItemID);

    const onCardPress = useCallback(() => {
        if (playerCardData) {
            navigate.navigate("PlayerCardDetails", { playercard: playerCardData.data, offer });
        }
    }, [navigate, playerCardData, offer]);

    if (isLoadingCard) {
        return <CardPlayerSkeleton />;
    }

    if (playerCardError || !playerCardData) {
        return <Error />;
    }

    const playercard = playerCardData.data;

    return (
        <TouchableRipple
            borderless
            key={offer.OfferID}
            onPress={onCardPress}
            style={[styles.container, { backgroundColor: colors.card }]}
            rippleColor="rgba(255, 70, 86, .20)"
        >
            <ImageBackground
                blurRadius={16}
                source={{ uri: playercard.wideArt }}
                style={styles.imageBackground}
            >
                <View style={styles.infoContainer}>
                    <Text variant="titleLarge" style={styles.title} numberOfLines={1}>
                        {removeCardType(playercard.displayName, "card")}
                    </Text>
                    <View style={styles.imageContainer}>
                        <Image
                            borderRadius={8}
                            source={{ uri: playercard.wideArt }}
                            style={styles.wideArt}
                        />
                    </View>
                    <CostPoint currencyId={Object.keys(offer.Cost)[0]} cost={offer.Cost[Object.keys(offer.Cost)[0]]} />
                </View>
                <Image
                    resizeMode="center"
                    source={{ uri: playercard.largeArt }}
                    style={styles.largeArt}
                />
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
        height: 220,
        flexDirection: "row",
        overflow: "hidden",
    },
    infoContainer: {
        gap: 16,
        flex: 1,
        padding: 16,
        flexDirection: "column",
        justifyContent: "space-between",
    },
    title: {
        textTransform: "capitalize",
    },
    imageContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    wideArt: {
        width: "100%",
        height: 100,
    },
    largeArt: {
        width: 92,
        height: 220,
    },
});

export default React.memo(CardPlayer);
