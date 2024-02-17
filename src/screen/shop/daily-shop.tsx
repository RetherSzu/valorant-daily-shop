import { View } from "react-native";
import { Text } from "react-native-paper";
// component
import Loading from "@/component/loading/loading";
// context
import { useThemeContext } from "@/context/hook/use-theme-context";
import { useAuthContext } from "@/context/hook/use-auth-context";
// section
import CardListOffer from "@/section/shop/daily-shop/card-list-offer";
// util
import { secToTime } from "@/util/format-time";

const DailyShop = () => {

    const { colors } = useThemeContext();

    const { shop: { offers } } = useAuthContext();

    if (offers.SingleItemOffers.length === 0) {
        return (
            <View style={{ flex: 1, backgroundColor: colors.background }}>
                <Loading />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, paddingTop: 16, backgroundColor: colors.background, gap: 8, paddingHorizontal: 16 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text variant="titleMedium" style={{ color: colors.text }}>NEXT OFFER:</Text>
                <Text variant="titleMedium" style={{ color: "#E5E1B2" }}>
                    {secToTime(offers.SingleItemOffersRemainingDurationInSeconds)}
                </Text>
            </View>
            <CardListOffer offers={offers.SingleItemStoreOffers} />
        </View>
    );
};

export default DailyShop;
