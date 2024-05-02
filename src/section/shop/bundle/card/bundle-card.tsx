import { TouchableRipple } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Image, ImageBackground, View } from "react-native";
// api
import { useGetPlayerCardIdQuery } from "@/api/rtk-valorant-api";
// component
import Error from "@/component/error/error";
import Text from "@/component/typography/text";
// context
import useThemeContext from "@/context/hook/use-theme-context";
// section
import CostPoint from "@/section/shop/cost-point";
import BundleCardSkeleton from "@/section/shop/bundle/card/bundle-card-skeleton";
// type
import { Offer } from "@/type/api/shop";
import { BundleInfo } from "@/type/api/shop/bundle";
import { NavigationProp } from "@/type/router/navigation";

type BundleCardProps = {
    offer: Offer;
    theme: BundleInfo
};

const BundleCard = ({ offer, theme }: BundleCardProps) => {

    const { colors } = useThemeContext();

    const { data, error, isLoading } = useGetPlayerCardIdQuery(offer.Rewards[0].ItemID);

    const navigate = useNavigation<NavigationProp>();

    if (isLoading) {
        return <BundleCardSkeleton />;
    }

    if (error || !data) {
        return <Error />;
    }

    const playercard = data.data;

    const onCardPress = () => {
        if (!data) return;
        navigate.navigate("CardDetails", {
            playercard,
            offer,
            theme,
        });
    };

    return (
        <TouchableRipple
            borderless
            onPress={onCardPress}
            style={{
                flex: 1, borderRadius: 16,
                backgroundColor: colors.card, overflow: "hidden",
            }}
            rippleColor="rgba(255, 70, 86, .20)"
        >
            <ImageBackground
                blurRadius={16}
                source={{ uri: playercard.wideArt }}
                style={{ height: 220, flexDirection: "row", overflow: "hidden" }}
            >
                <View
                    style={{
                        gap: 16,
                        flex: 1,
                        padding: 8,
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    <Text variant="titleLarge" numberOfLines={1}>{playercard.displayName}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                        <Image source={{ uri: playercard.wideArt }} style={{ width: 100, height: 100 }}
                               borderRadius={16} />
                        <Image source={{ uri: playercard.smallArt }} style={{ width: 100, height: 100 }}
                               borderRadius={16} />
                    </View>
                    <CostPoint currencyId={Object.keys(offer.Cost)[0]} cost={offer.Cost[Object.keys(offer.Cost)[0]]} />
                </View>
                <Image
                    source={{ uri: playercard.largeArt }}
                    resizeMode="center"
                    style={{ width: 92, height: 220 }}
                />
            </ImageBackground>
        </TouchableRipple>
    );
};

export default BundleCard;
