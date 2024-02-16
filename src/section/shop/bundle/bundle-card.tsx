import { Image, ImageBackground, View } from "react-native";
// api
import { useGetPlayerCardIdQuery } from "@/api/rtk-valorant-api";
// component
import Error from "@/component/error/error";
import Text from "@/component/typography/text";
import Loading from "@/component/loading/loading";
// section
import CostPoint from "@/section/shop/cost-point";
// type
import { Offer } from "@/type/api/shop";

type Props = {
    offer: Offer;
};

export const BundleCard = ({ offer }: Props) => {

    const { data, error, isLoading } = useGetPlayerCardIdQuery(offer.Rewards[0].ItemID);

    if (isLoading) {
        return (<Loading />);
    }

    if (error || !data) {
        return (<Error />);
    }

    const itemInfo = data.data;

    return (
        <ImageBackground
            source={{ uri: itemInfo.wideArt }}
            style={{
                backgroundColor: "#1F2326",
                borderRadius: 20,
                height: 220,
                flexDirection: "row",
                overflow: "hidden"
            }}
            blurRadius={20}
        >
            <View
                style={{
                    gap: 16,
                    flex: 1,
                    padding: 16,
                    flexDirection: "column",
                    justifyContent: "space-between"
                }}
            >
                <Text variant="titleLarge" style={{ color: "white" }} numberOfLines={1}>
                    {itemInfo.displayName}
                </Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Image source={{ uri: itemInfo.wideArt }} style={{ width: 100, height: 100 }} borderRadius={16} />
                    <Image source={{ uri: itemInfo.smallArt }} style={{ width: 100, height: 100 }} borderRadius={16} />
                </View>
                <CostPoint currencyId={Object.keys(offer.Cost)[0]} cost={offer.Cost[Object.keys(offer.Cost)[0]]} />
            </View>
            <Image
                source={{ uri: itemInfo.largeArt }}
                resizeMode="center"
                style={{ width: 92, height: 220 }}
            />
        </ImageBackground>
    );
};

export default BundleCard;
