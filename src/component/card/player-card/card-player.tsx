import useThemeContext from "@/context/hook/use-theme-context";
import { useGetPlayerCardIdQuery } from "@/api/rtk-valorant-api";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@/type/router/navigation";
import CardPlayerSkeleton from "@/component/card/player-card/card-player-skeleton";
import Error from "@/component/error/error";
import { TouchableRipple } from "react-native-paper";
import { Image, ImageBackground, View } from "react-native";
import Text from "@/component/typography/text";
import CostPoint from "@/section/shop/cost-point";
import { Offer } from "@/type/api/shop";

type CardPlayerProps = {
    offer: Offer;
};

const CardPlayer = ({ offer }: CardPlayerProps) => {

    const { colors } = useThemeContext();

    const navigate = useNavigation<NavigationProp>();

    const {
        data: playerCardData,
        error: playerCardError,
        isLoading: isLoadingCard,
    } = useGetPlayerCardIdQuery(offer.Rewards[0].ItemID);

    if (isLoadingCard) {
        return <CardPlayerSkeleton />;
    }

    if (playerCardError || !playerCardData) {
        return <Error />;
    }

    const playercard = playerCardData.data;

    const onCardPress = () => {
        if (!playerCardData) return;
        navigate.navigate("PlayerCardDetails", { playercard, offer });
    };

    return (
        <TouchableRipple
            borderless
            onPress={onCardPress}
            style={{
                flex: 1,
                borderRadius: 16,
                overflow: "hidden",
                backgroundColor: colors.card,
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
                        padding: 16,
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    <Text variant="titleLarge" numberOfLines={1}>Card</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                        <Image
                            borderRadius={8}
                            source={{ uri: playercard.wideArt }}
                            style={{ width: "100%", height: 100 }}
                        />
                    </View>
                    <CostPoint currencyId={Object.keys(offer.Cost)[0]} cost={offer.Cost[Object.keys(offer.Cost)[0]]} />
                </View>
                <Image
                    resizeMode="center"
                    source={{ uri: playercard.largeArt }}
                    style={{ width: 92, height: 220 }}
                />
            </ImageBackground>
        </TouchableRipple>
    );
};

export default CardPlayer;
