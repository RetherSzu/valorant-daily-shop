import { TouchableRipple } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Image, ImageBackground, View } from "react-native";
// api
import { useGetSprayByIdQuery, useGetThemeByIdQuery } from "@/api/rtk-valorant-api";
// component
import Error from "@/component/error/error";
import Text from "@/component/typography/text";
// context
import useThemeContext from "@/context/hook/use-theme-context";
// section
import CostPoint from "@/section/shop/cost-point";
import CardSpraySkeleton from "@/component/card/spray/card-spray-skeleton";
// type
import { Offer } from "@/type/api/shop";
import { NavigationProp } from "@/type/router/navigation";

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

    const skinData = sprayData.data;

    const renderSprays = [skinData.fullIcon, skinData.fullTransparentIcon, skinData.displayIcon].map((iconUrl, index) => {
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
                source={{ uri: skinData.displayIcon }}
            >
                <Text variant="titleLarge" numberOfLines={1}>Spray</Text>
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
