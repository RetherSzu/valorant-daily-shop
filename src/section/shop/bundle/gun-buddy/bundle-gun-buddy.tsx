import { Image, ImageBackground, View } from "react-native";
// api
import { useGetGunBuddyByIdQuery } from "@/api/rtk-valorant-api";
// component
import Error from "@/component/error/error";
import Text from "@/component/typography/text";
// section
import CostPoint from "@/section/shop/cost-point";
import BundleGunBuddySkeleton from "@/section/shop/bundle/gun-buddy/bundle-gun-buddy-skeleton";
// type
import { Offer } from "@/type/api/shop";

type Props = {
    offer: Offer;
};

export const BundleGunBuddy = ({ offer }: Props) => {

    const { data, error, isLoading } = useGetGunBuddyByIdQuery(offer.Rewards[0].ItemID);

    if (isLoading) {
        return <BundleGunBuddySkeleton />;
    }


    if (error || !data) {
        return <Error />;
    }

    const buddy = data.data;

    return (
        <ImageBackground
            source={{ uri: buddy.displayIcon }}
            style={{
                backgroundColor: "#1F2326",
                borderRadius: 20,
                flexDirection: "row",
                overflow: "hidden"
            }}
            blurRadius={20}
        >
            <View
                style={{
                    gap: 16,
                    flex: 1,
                    padding: 8,
                    flexDirection: "column",
                    justifyContent: "space-between"
                }}
            >
                <Text variant="titleLarge" style={{ color: "white" }}>
                    {buddy.displayName}
                </Text>
                <CostPoint currencyId={Object.keys(offer.Cost)[0]} cost={offer.Cost[Object.keys(offer.Cost)[0]]} />
            </View>
            <Image
                source={{ uri: buddy.displayIcon }}
                resizeMode="center"
                style={{ width: 100, height: 100, transform: [{ scale: 1.5 }] }}
            />
        </ImageBackground>
    );
};

export default BundleGunBuddy;
