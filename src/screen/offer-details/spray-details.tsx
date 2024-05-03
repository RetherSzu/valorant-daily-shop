import { Dimensions, Image, ScrollView, View } from "react-native";
// component
import Text from "@/component/typography/text";
// context
import useThemeContext from "@/context/hook/use-theme-context";
// section
import CostPoint from "@/section/shop/cost-point";
// type
import { SprayDetailScreenProps } from "@/type/router/navigation";

const WIDTH = Dimensions.get("window").width;

const SprayDetails = ({ route }: SprayDetailScreenProps) => {

    const { spray, offer, theme } = route.params;

    const { colors } = useThemeContext();

    return (
        <View style={{ flex: 1, padding: 16, gap: 16 }}>
            <View>
                <Text variant="displayLarge" style={{ fontFamily: "Vandchrome" }}>
                    {theme.displayName}
                </Text>
                <Text variant="titleLarge" style={{ opacity: .5, textTransform: "uppercase" }}>
                    SPRAY
                </Text>
            </View>
            <CostPoint currencyId={Object.keys(offer.Cost)[0]} cost={offer.Cost[Object.keys(offer.Cost)[0]]} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
                contentContainerStyle={{ gap: 16, justifyContent: "center", alignItems: "center" }}
            >
                {[spray.fullTransparentIcon, spray.fullIcon].map((icon, index) => (
                    <View key={index} style={{ backgroundColor: colors.card, borderRadius: 32, padding: 16 }}>
                        <Image
                            borderRadius={16}
                            resizeMode="contain"
                            source={{ uri: icon }}
                            style={{ width: WIDTH - 64, height: WIDTH - 64 }}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default SprayDetails;
