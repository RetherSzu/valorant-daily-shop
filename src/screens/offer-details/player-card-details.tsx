import { Dimensions, Image, View } from "react-native";
// components
import Text from "@/components/typography/text";
import CostPoint from "@/components/cost/cost-point";
// types
import { PlayerCardDetailScreenProps } from "@/types/router/navigation";

const WIDTH = Dimensions.get("window").width;

const PlayerCardDetails = ({ route }: PlayerCardDetailScreenProps) => {

    const { playercard, offer } = route.params;

    return (
        <View style={{ flex: 1, padding: 16, gap: 16 }}>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 16 }}>
                <Image
                    borderRadius={16}
                    resizeMode="cover"
                    source={{ uri: playercard.largeArt }}
                    style={{ width: WIDTH / 2, height: "100%" }}
                />
                <View
                    style={{
                        gap: 16,
                        flex: 1,
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <View style={{ gap: 8, width: "100%", flex: 1, justifyContent: "flex-start" }}>
                        <Text variant="headlineLarge" style={{ fontFamily: "Vandchrome" }}>
                            {playercard.displayName.toLowerCase().replace("card", "").trim()}
                        </Text>
                        <Text variant="titleLarge" style={{ opacity: .5, textTransform: "uppercase" }}>
                            CARD
                        </Text>
                        <CostPoint
                            currencyId={Object.keys(offer.Cost)[0]}
                            cost={offer.Cost[Object.keys(offer.Cost)[0]]}
                        />
                    </View>
                    <View>
                        <Image
                            borderRadius={16}
                            resizeMode="contain"
                            source={{ uri: playercard.smallArt }}
                            style={{ width: WIDTH / 2 - 48, height: WIDTH / 2 - 48 }}
                        />
                    </View>
                </View>
            </View>
            <Image
                borderRadius={16}
                resizeMode="cover"
                source={{ uri: playercard.wideArt }}
                style={{ width: WIDTH - 32, height: 128 }}
            />
        </View>
    );
};

export default PlayerCardDetails;
