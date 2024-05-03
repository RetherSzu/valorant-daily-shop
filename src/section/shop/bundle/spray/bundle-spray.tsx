import { TouchableRipple } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Image, ImageBackground, View } from "react-native";
// api
import { useGetSprayByIdQuery } from "@/api/rtk-valorant-api";
// component
import Error from "@/component/error/error";
import Text from "@/component/typography/text";
// context
import useThemeContext from "@/context/hook/use-theme-context";
// section
import CostPoint from "@/section/shop/cost-point";
import BundleSpraySkeleton from "@/section/shop/bundle/spray/bundle-spray-skeleton";
// type
import { Offer } from "@/type/api/shop";
import { BundleInfo } from "@/type/api/shop/bundle";
import { NavigationProp } from "@/type/router/navigation";

type Props = {
    offer: Offer;
    theme: BundleInfo;
}

const BundleSpray = ({ offer, theme }: Props) => {

    const navigate = useNavigation<NavigationProp>();

    const { colors } = useThemeContext();

    const {
        data: sprayData,
        error: sprayError,
        isLoading: isLoadingSpray,
    } = useGetSprayByIdQuery(offer.Rewards[0].ItemID);

    if (isLoadingSpray) {
        return <BundleSpraySkeleton />;
    }

    if (sprayError || !sprayData) {
        return <Error />;
    }

    const onCardPress = () => {
        navigate.navigate("SprayDetails", {
            spray: sprayData.data,
            offer,
            theme,
        });
    };

    const skinData = sprayData.data;

    const renderSprays = [skinData.fullIcon, skinData.fullTransparentIcon, skinData.displayIcon].map((iconUrl, index) => {
        return (
            <View key={index} style={{ overflow: "hidden", width: 92, height: 92, borderRadius: 16 }}>
                <Image
                    source={{ uri: iconUrl }}
                    style={{ flex: 1, height: 70 }}
                    resizeMode="contain"
                />
            </View>
        );
    });

    return (
        <TouchableRipple
            borderless
            onPress={onCardPress}
            rippleColor="rgba(255, 70, 86, .20)"
            style={{
                flex: 1,
                borderRadius: 16,
                overflow: "hidden",
                backgroundColor: colors.card,
            }}
        >
            <ImageBackground
                blurRadius={50}
                style={{
                    gap: 16,
                    padding: 8,
                    borderRadius: 16,
                    overflow: "hidden",
                    flexDirection: "column",
                    backgroundColor: colors.card,
                }}
            >
                <Text variant="titleLarge" numberOfLines={1}>Spray</Text>
                <View
                    style={{
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-around",
                    }}
                >
                    {renderSprays}
                </View>
                <CostPoint currencyId={Object.keys(offer.Cost)[0]} cost={offer.Cost[Object.keys(offer.Cost)[0]]} />
            </ImageBackground>
        </TouchableRipple>
    );
};

export default BundleSpray;
