import { Image, ImageBackground, View } from "react-native";
// api
import { useGetTitleByIdQuery } from "@/api/rtk-valorant-api";
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
}

const BundlePlayerTitle = ({ offer }: Props) => {

    const { data, error, isLoading } = useGetTitleByIdQuery(offer.Rewards[0].ItemID);

    if (isLoading) {
        return (<Loading />);
    }

    if (error || !data) {
        return (<Error />);
    }

    const playerTitle = data.data;

    return (
        <ImageBackground
            source={require("../../../../assets/player-title.png")}
            className="bg-[#222429] p-4"
            style={{
                flexDirection: "column",
                borderRadius: 16,
                overflow: "hidden",
                gap: 16
            }}
            blurRadius={150}
        >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image source={require("../../../../assets/player-title.png")} style={{ width: 150, height: 100 }} />
            </View>
            <Text
                variant="titleLarge"
                style={{
                    fontWeight: "bold",
                    backgroundColor: "rgba(0,0,0,0.1)",
                    textAlign: "center",
                    padding: 8,
                    borderRadius: 8
                }}
                numberOfLines={1}
            >
                {playerTitle.displayName.replace(" Title", "")}
            </Text>
            <CostPoint currencyId={Object.keys(offer.Cost)[0]} cost={offer.Cost[Object.keys(offer.Cost)[0]]} />
        </ImageBackground>
    );
};

export default BundlePlayerTitle;
