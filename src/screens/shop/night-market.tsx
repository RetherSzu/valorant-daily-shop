import { ScrollView, View } from "react-native";
// contexts
import useThemeContext from "@/contexts/hook/use-theme-context";
import useNightMarketContext from "@/contexts/hook/use-night-market-context";
// components
import Text from "@/components/typography/text";
import Loading from "@/components/loading/loading";
// sections
import NightMarketCardItem from "@/sections/shop/night-market/night-market-card-item";
// utils
import { secondsToDhms } from "@/utils/format-time";

const NightMarket = () => {

    const { colors } = useThemeContext();

    const { nightMarket } = useNightMarketContext();

    if (!nightMarket || !nightMarket.BonusStoreOffers) {
        return <Loading />;
    }

    const nightMarketOffers = (
        <ScrollView style={{ paddingHorizontal: 16 }} contentContainerStyle={{ rowGap: 16 }} overScrollMode="never">
            {nightMarket.BonusStoreOffers.map((offer, index) => {
                return <NightMarketCardItem item={offer} key={index} />;
            })}
        </ScrollView>
    );

    return (
        <View style={{ backgroundColor: colors.background, flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16 }}>
                <Text variant="titleMedium" style={{ color: colors.text }}>TIME LEFT:</Text>
                <Text variant="titleMedium" style={{ color: "#E5E1B2" }}>
                    {secondsToDhms(nightMarket?.BonusStoreRemainingDurationInSeconds ?? 0)}
                </Text>
            </View>
            {nightMarketOffers}
        </View>
    );
};

export default NightMarket;
