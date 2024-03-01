import { FlatList, View } from "react-native";
// section
import OfferItem from "@/section/shop/plugin-store/offer-item";
// types
import { PluginStore } from "@/type/api/shop/plugin-store";

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
