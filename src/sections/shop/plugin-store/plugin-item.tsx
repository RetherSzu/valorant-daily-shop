import { FlatList, View } from "react-native";
// sections
import OfferItem from "@/sections/shop/plugin-store/offer-item";
// types
import { PluginStore } from "@/types/api/shop/plugin-store";

type Props = {
    plugin: PluginStore;
};

const PluginItem = ({ plugin }: Props) => {
    return (
        <View style={{ position: "relative" }}>
            <FlatList
                contentContainerStyle={{ gap: 16 }}
                showsVerticalScrollIndicator={false}
                data={plugin.PluginOffers.StoreOffers}
                renderItem={({ item, index }) => <OfferItem key={index} offer={item} />}
            />
        </View>
    );
};

export default PluginItem;
