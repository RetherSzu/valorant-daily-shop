import { ScrollView, View } from "react-native";
// context
import useThemeContext from "@/context/hook/use-theme-context";
import useNightMarketContext from "@/context/hook/use-night-market-context";
// component
import Text from "@/component/typography/text";
import Loading from "@/component/loading/loading";
// section
import NightMarketCardItem from "@/section/shop/night-market/night-market-card-item";
// util
import { secondsToDhms } from "@/util/format-time";

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
