import { FlatList, View } from "react-native";
// components
import Text from "@/components/typography/text";
// contexts
import useAccessoryStoreContext from "@/contexts/hook/use-accessory-store-context";
// factory
import CardFactory from "@/factories/card-factory";
// utils
import { secToTime } from "@/utils/format-time";

const AccessoryStore = () => {

    const { accessoryStore } = useAccessoryStoreContext();

    return (
        <View style={{ flex: 1, paddingTop: 16, gap: 8, paddingHorizontal: 16 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text variant="titleMedium">NEXT OFFER:</Text>
                <Text
                    variant="titleMedium"
                    style={{ color: "#E5E1B2" }}
                    key={accessoryStore.AccessoryStoreRemainingDurationInSeconds}
                >
                    {secToTime(accessoryStore.AccessoryStoreRemainingDurationInSeconds)}
                </Text>
            </View>

            <FlatList
                contentContainerStyle={{ gap: 16 }}
                data={accessoryStore.AccessoryStoreOffers}
                style={{ flex: 1 }}
                renderItem={(item) => <CardFactory key={item.index} offer={item.item.Offer} />}
            />
        </View>
    );
};

export default AccessoryStore;
