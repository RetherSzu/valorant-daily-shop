import { View } from "react-native";
// components
import Text from "@/components/typography/text";
import Loading from "@/components/loading/loading";
// contexts
import useThemeContext from "@/contexts/hook/use-theme-context";
import useDailyShopContext from "@/contexts/hook/use-daily-shop-context";
// sections
import CardListOffer from "@/sections/shop/daily-shop/card-list-offer";
// utils
import { secToTime } from "@/utils/format-time";

const DailyShop = () => {

    const { colors } = useThemeContext();

    const { dailyShop } = useDailyShopContext();

    if (dailyShop.SingleItemOffers.length === 0) {
        return (
            <View style={{ flex: 1, backgroundColor: colors.background }}>
                <Loading />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, paddingTop: 16, backgroundColor: colors.background, gap: 8, paddingHorizontal: 16 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text variant="titleMedium">NEXT OFFER:</Text>
                <Text key={dailyShop.SingleItemOffersRemainingDurationInSeconds} variant="titleMedium"
                      style={{ color: "#E5E1B2" }}>
                    {secToTime(dailyShop.SingleItemOffersRemainingDurationInSeconds)}
                </Text>
            </View>
            <CardListOffer offers={dailyShop.SingleItemStoreOffers} />
        </View>
    );
};

export default DailyShop;
