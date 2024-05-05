import { TouchableRipple } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Image, ImageBackground, View } from "react-native";
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
}

const CardSpray = ({ offer }: CardSprayProps) => {

    const navigate = useNavigation<NavigationProp>();

    const { colors } = useThemeContext();

    const {
        data: sprayData,
        error: sprayError,
        isLoading: isLoadingSpray,
    } = useGetSprayByIdQuery(offer.Rewards[0].ItemID);

    if (isLoadingSpray) {
        return <CardSpraySkeleton />;
    }

    if (sprayError || !sprayData) {
        return <Error />;
    }

    const onCardPress = () => {
        navigate.navigate("SprayDetails", {
            spray: sprayData.data,
            offer,
        });
    };

    const spray = sprayData.data;

    const renderSprays = [spray.fullIcon, spray.fullTransparentIcon, spray.displayIcon].map((iconUrl, index) => {
        return (
            <View key={index} style={{ width: 92, height: 92 }}>
                <Image
                    borderRadius={8}
                    source={{ uri: iconUrl }}
                    style={{ flex: 1, height: 70 }}
                    resizeMode="contain"
                />
            </View>
        );
    });

    return (
        <TouchableRipple
            borderless
            onPress={onCardPress}
            rippleColor="rgba(255, 70, 86, .20)"
            style={{
                flex: 1,
                borderRadius: 16,
                overflow: "hidden",
                backgroundColor: colors.card,
            }}
        >
            <ImageBackground
                style={{
                    gap: 16,
                    padding: 16,
                }}
                blurRadius={50}
                source={{ uri: spray.displayIcon }}
            >
                <Text variant="titleLarge" style={{ textTransform: "capitalize" }} numberOfLines={1}>
                    {removeCardType(spray.displayName, "spray")}
                </Text>
                <View
                    style={{
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    {renderSprays}
                </View>
                <CostPoint currencyId={Object.keys(offer.Cost)[0]} cost={offer.Cost[Object.keys(offer.Cost)[0]]} />
            </ImageBackground>
        </TouchableRipple>
    );
};

export default CardSpray;
