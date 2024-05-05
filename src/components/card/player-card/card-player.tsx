import { TouchableRipple } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Image, ImageBackground, View } from "react-native";
// api
import { useGetPlayerCardIdQuery } from "@/api/rtk-valorant-api";
// components
import Error from "@/components/error/error";
import Text from "@/components/typography/text";
import CardPlayerSkeleton from "@/components/card/player-card/card-player-skeleton";
// contexts
import useThemeContext from "@/contexts/hook/use-theme-context";
// sections
import CostPoint from "@/sections/shop/cost-point";
// types
import { Offer } from "@/types/api/shop";
import { NavigationProp } from "@/types/router/navigation";
// utils
import { removeCardType } from "@/utils/format-string";

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
                    <Text variant="titleLarge" style={{ textTransform: "capitalize" }} numberOfLines={1}>
                        {removeCardType(playercard.displayName, "card")}
                    </Text>
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
