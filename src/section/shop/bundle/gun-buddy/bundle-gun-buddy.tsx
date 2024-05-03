import { TouchableRipple } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Image, ImageBackground, View } from "react-native";
// api
import { useGetGunBuddyByIdQuery } from "@/api/rtk-valorant-api";
// component
import Error from "@/component/error/error";
import Text from "@/component/typography/text";
// context
import useThemeContext from "@/context/hook/use-theme-context";
// section
import CostPoint from "@/section/shop/cost-point";
import BundleGunBuddySkeleton from "@/section/shop/bundle/gun-buddy/bundle-gun-buddy-skeleton";
// type
import { Offer } from "@/type/api/shop";
import { BundleInfo } from "@/type/api/shop/bundle";
import { NavigationProp } from "@/type/router/navigation";

type Props = {
    offer: Offer;
    theme: BundleInfo;
};

export const BundleGunBuddy = ({ offer, theme }: Props) => {

    const navigate = useNavigation<NavigationProp>();

    const { colors } = useThemeContext();

    const {
        data: buddyData,
        error: buddyError,
        isLoading: isLoadingBuddy,
    } = useGetGunBuddyByIdQuery(offer.Rewards[0].ItemID);

    if (isLoadingBuddy) {
        return <BundleGunBuddySkeleton />;
    }

    if (buddyError || !buddyData) {
        return <Error />;
    }

    const buddy = buddyData.data;

    const onCardPress = () => navigate.navigate("BuddyDetails", { buddy, offer, theme });

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
                blurRadius={20}
                style={{
                    borderRadius: 20,
                    overflow: "hidden",
                    flexDirection: "row",
                }}
                source={{ uri: buddy.displayIcon }}
            >
                <View
                    style={{
                        gap: 16,
                        flex: 1,
                        padding: 8,
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    <Text variant="titleLarge">Buddy</Text>
                    <CostPoint currencyId={Object.keys(offer.Cost)[0]} cost={offer.Cost[Object.keys(offer.Cost)[0]]} />
                </View>
                <Image
                    resizeMode="center"
                    source={{ uri: buddy.displayIcon }}
                    style={{ width: 100, height: 100, transform: [{ scale: 1.5 }] }}
                />
            </ImageBackground>
        </TouchableRipple>
    );
};

export default BundleGunBuddy;
