import { TouchableRipple } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Image, ImageBackground, View } from "react-native";
// api
import { useGetGunBuddyByIdQuery } from "@/api/rtk-valorant-api";
// components
import Error from "@/components/error/error";
import Text from "@/components/typography/text";
import CostPoint from "@/components/cost/cost-point";
import CardBuddySkeleton from "@/components/card/buddy/card-buddy-skeleton";
// contexts
import useThemeContext from "@/contexts/hook/use-theme-context";
// types
import { Offer } from "@/types/api/shop";
import { NavigationProp } from "@/types/router/navigation";
// utils
import { removeCardType } from "@/utils/format-string";

type Props = {
    offer: Offer;
};

const CardBuddy = ({ offer }: Props) => {

    const navigate = useNavigation<NavigationProp>();

    const { colors } = useThemeContext();

    const {
        data: buddyData,
        error: buddyError,
        isLoading: isLoadingBuddy,
    } = useGetGunBuddyByIdQuery(offer.Rewards[0].ItemID);

    if (isLoadingBuddy) {
        return <CardBuddySkeleton />;
    }

    if (buddyError || !buddyData) {
        return <Error />;
    }

    const buddy = buddyData.data;

    const onCardPress = () => navigate.navigate("BuddyDetails", { buddy, offer });

    return (
        <TouchableRipple
            borderless
            onPress={onCardPress}
            rippleColor="rgba(255, 70, 86, .20)"
            style={{
                flex: 1,
                borderRadius: 16,
                backgroundColor: colors.card,
            }}
        >
            <ImageBackground
                blurRadius={20}
                style={{
                    padding: 16,
                    flexDirection: "row",
                }}
                source={{ uri: buddy.displayIcon }}
            >
                <View
                    style={{
                        gap: 16,
                        flex: 1,
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    <Text variant="titleLarge" style={{ textTransform: "capitalize" }}>
                        {removeCardType(buddy.displayName, "buddy")}
                    </Text>
                    <CostPoint currencyId={Object.keys(offer.Cost)[0]} cost={offer.Cost[Object.keys(offer.Cost)[0]]} />
                </View>
                <Image
                    resizeMode="center"
                    source={{ uri: buddy.displayIcon }}
                    style={{ width: 100, height: 100, transform: [{ scale: 1.75 }] }}
                />
            </ImageBackground>
        </TouchableRipple>
    );
};

export default CardBuddy;
