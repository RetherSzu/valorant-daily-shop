import { StyleSheet, View } from "react-native";
// types
import { ItemStoreOffer } from "@/type/api/shop";
//
import CardItemOffer from "./card-item-offer";

type Props = {
    offers: ItemStoreOffer[];
}

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
        gap: 16
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        gap: 16
    }
});

export default CardListOffer;
