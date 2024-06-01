import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, ImageBackground, StyleSheet, TouchableHighlight, View } from "react-native";
// api
import { useGetBundleByIdQuery } from "@/api/rtk-valorant-api";
// components
import Text from "@/components/typography/text";
// sections
import OfferItemSkeleton from "@/sections/shop/plugin-store/offer-item-skeleton";
// types
import { StoreOffer } from "@/types/api/shop/plugin-store";
import { NavigationProp } from "@/types/router/navigation";

type Props = {
    offer: StoreOffer;
};

const OfferItem = ({ offer }: Props) => {

    const navigate = useNavigation<NavigationProp>();

    const { data, isLoading, error } = useGetBundleByIdQuery(offer.PurchaseInformation.DataAssetID);

    if (isLoading) return <OfferItemSkeleton />;

    if (error || !data) return null;

    const offerData = data.data;

    return (
        <TouchableHighlight
            underlayColor="#1B1D2133"
            style={styles.touchable}
            onPress={() => navigate.navigate("Plugin", { plugin: offer })}
        >
            <ImageBackground
                blurRadius={50}
                style={styles.imageBackground}
                source={{ uri: offerData.displayIcon }}
            >
                <Image
                    resizeMode="contain"
                    style={styles.image}
                    source={{ uri: offerData?.logoIcon ?? "" }}
                />
                <View style={styles.textContainer}>
                    <Text>{offerData.displayName}</Text>
                </View>
            </ImageBackground>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    touchable: {
        height: 200,
        borderRadius: 16,
        overflow: "hidden",
    },
    imageBackground: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        flex: 1,
        width: 150,
        height: 100,
        borderRadius: 16,
    },
    textContainer: {
        height: 54,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.2)",
    },
});

export default React.memo(OfferItem);
