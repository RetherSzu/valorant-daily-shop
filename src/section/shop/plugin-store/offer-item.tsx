import React from "react";
import { Image, ImageBackground, TouchableHighlight, View } from "react-native";
// api
import { useGetBundleByIdQuery } from "@/api/rtk-valorant-api";
// component
import Text from "@/component/typography/text";
// type
import { StoreOffer } from "@/type/api/shop/plugin-store";
import { useNavigation } from "@react-navigation/native";

type Props = {
    offer: StoreOffer
};

const OfferItem = ({ offer }: Props) => {

    const navigate = useNavigation();

    const { data, isLoading, error } = useGetBundleByIdQuery(offer.PurchaseInformation.DataAssetID);

    if (isLoading) return <Text>Loading...</Text>;

    if (error || !data) return <Text>Error...</Text>;

    const offerData = data.data;

    return (
        <TouchableHighlight
            underlayColor="#1B1D2133"
            style={{ height: 200, borderRadius: 16, overflow: "hidden" }}
            // @ts-ignore
            onPress={() => navigate.navigate("Plugin", { plugin: offer })}
        >
            <ImageBackground
                source={{ uri: offerData.displayIcon }}
                style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center"
                }}
                blurRadius={50}
            >
                <Image
                    resizeMode="contain"
                    source={{ uri: offerData.displayIcon2 }}
                    style={{ width: 150, height: 100, borderRadius: 16, flex: 1 }}
                />
                <View
                    style={{
                        width: "100%",
                        height: 54,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(255,255,255,0.2)"
                    }}
                >
                    <Text>{offerData.displayName}</Text>
                </View>
            </ImageBackground>
        </TouchableHighlight>
    );
};

export default OfferItem;
