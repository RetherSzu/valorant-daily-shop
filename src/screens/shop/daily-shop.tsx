import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
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

    const remainingTime = useMemo(
        () => secToTime(dailyShop.SingleItemOffersRemainingDurationInSeconds),
        [dailyShop.SingleItemOffersRemainingDurationInSeconds]
    );

    if (dailyShop.SingleItemOffers.length === 0) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Loading />
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Text variant="titleMedium">NEXT OFFER:</Text>
                <Text key={dailyShop.SingleItemOffersRemainingDurationInSeconds} variant="titleMedium" style={styles.remainingTime}>
                    {remainingTime}
                </Text>
            </View>
            <CardListOffer offers={dailyShop.SingleItemStoreOffers} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 16,
        paddingHorizontal: 16,
        gap: 8,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    remainingTime: {
        color: "#E5E1B2",
    },
});

export default React.memo(DailyShop);
