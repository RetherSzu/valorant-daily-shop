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

const DayliShop = () => {

    const { colors } = useThemeContext();

    const { shop: { offers } } = useAuthContext();

    if (offers.SingleItemOffers.length === 0) {
        return <Loading />;
    }

    return (
        <View className="flex flex-1 pt-4" style={{ backgroundColor: "#1B1D21", gap: 8 }}>
            <View className="flex flex-row items-center justify-between">
                <Text variant="titleMedium" style={{ color: colors.text }}>NEXT OFFER:</Text>
                <Text variant="titleMedium" style={{ color: "#E5E1B2" }}>
                    {secToTime(offers.SingleItemOffersRemainingDurationInSeconds)}
                </Text>
            </View>
            <CardListOffer offers={offers.SingleItemStoreOffers} />
        </View>
    );
};

export default DayliShop;
