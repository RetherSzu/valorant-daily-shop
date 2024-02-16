import { Image, ImageBackground, View } from "react-native";
// api
import { useGetSprayByIdQuery } from "@/api/rtk-valorant-api";
// component
import Error from "@/component/error/error";
import Text from "@/component/typography/text";
import Loading from "@/component/loading/loading";
// section
import CostPoint from "@/section/shop/cost-point";
// type
import { Offer } from "@/type/api/shop";
import { useEffect } from "react";

type Props = {
    offer: Offer;
}

const BundleSpray = ({ offer }: Props) => {

    const { data, error, isLoading } = useGetSprayByIdQuery(offer.Rewards[0].ItemID);

    useEffect(() => {
    }, [offer.Rewards[0].ItemID]);

    if (isLoading) {
        return (<Loading />);
    }

    if (error || !data) {
        return (<Error />);
    }

    const skinData = data.data;

    const renderSprays = [skinData.fullIcon, skinData.fullTransparentIcon, skinData.displayIcon].map((iconUrl, index) => {
        return (
            <View key={index} style={{ overflow: "hidden", width: 92, height: 92, borderRadius: 16 }}>
                <Image
                    source={{ uri: iconUrl }}
                    style={{ flex: 1, height: 70 }}
                    resizeMode="contain"
                />
            </View>
        );
    });


    return (
        <ImageBackground
            source={{ uri: skinData.fullIcon, scale: 10 }}
            blurRadius={50}
            className="bg-[#222429] p-4"
            style={{ flexDirection: "column", borderRadius: 16, overflow: "hidden", gap: 16 }}
        >
            <Text variant="titleLarge" style={{ fontWeight: "bold" }} numberOfLines={1}>
                {skinData.displayName}
            </Text>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center"
                }}
            >
                {renderSprays}
            </View>
            <CostPoint currencyId={Object.keys(offer.Cost)[0]} cost={offer.Cost[Object.keys(offer.Cost)[0]]} />
        </ImageBackground>
    );
};

export default BundleSpray;
