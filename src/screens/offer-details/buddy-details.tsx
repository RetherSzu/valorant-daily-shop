import { Image, View } from "react-native";
// components
import Text from "@/components/typography/text";
// sections
import CostPoint from "@/sections/shop/cost-point";
// types
import { BuddyDetailScreenProps } from "@/types/router/navigation";

const BuddyDetails = ({ route }: BuddyDetailScreenProps) => {

    const { buddy, offer } = route.params;

    return (
        <View style={{ flex: 1, padding: 16, gap: 16 }}>
            <Text variant="displayLarge" style={{ fontFamily: "Vandchrome" }}>
                {buddy.displayName.toLowerCase().replace("buddy", "").trim()}
            </Text>
            <Text variant="titleLarge" style={{ opacity: .5, textTransform: "uppercase" }}>
                BUDDY
            </Text>
            <CostPoint currencyId={Object.keys(offer.Cost)[0]} cost={offer.Cost[Object.keys(offer.Cost)[0]]} />
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Image
                    resizeMode="contain"
                    source={{ uri: buddy.displayIcon }}
                    style={{ width: 256, height: 256 }}
                />
            </View>
        </View>
    );
};

export default BuddyDetails;
