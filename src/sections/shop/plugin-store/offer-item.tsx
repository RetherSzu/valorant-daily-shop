import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, ImageBackground, TouchableHighlight, View } from "react-native";
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
    offer: StoreOffer
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
            style={{ height: 200, borderRadius: 16, overflow: "hidden" }}
            onPress={() => navigate.navigate("Plugin", { plugin: offer })}
        >
            <ImageBackground
                source={{ uri: offerData.displayIcon }}
                style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                blurRadius={50}
            >
                <Image
                    resizeMode="contain"
                    source={{ uri: offerData?.logoIcon ?? "" }}
                    style={{ width: 150, height: 100, borderRadius: 16, flex: 1 }}
                />
                <View
                    style={{
                        width: "100%",
                        height: 54,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(255,255,255,0.2)",
                    }}
                >
                    <Text>{offerData.displayName}</Text>
                </View>
            </ImageBackground>
        </TouchableHighlight>
    );
};

export default OfferItem;
