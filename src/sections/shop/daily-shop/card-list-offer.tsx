import React from "react";
import { StyleSheet, View } from "react-native";
// types
import { Offers } from "@/types/api/shop";
// components
import CardItemOffer from "./card-item-offer";

type Props = {
    offers: Offers;
};

const CardListOffer = ({ offers }: Props) => {
    return (
        <View style={styles.grid}>
            <View style={styles.row}>
                <CardItemOffer item={offers[0]} />
                <CardItemOffer item={offers[1]} />
            </View>
            <View style={styles.row}>
                <CardItemOffer item={offers[2]} />
                <CardItemOffer item={offers[3]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    grid: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        gap: 10,
    },
});

export default React.memo(CardListOffer);
