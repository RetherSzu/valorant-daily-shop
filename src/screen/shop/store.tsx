import { View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// component
import Text from "@/component/typography/text";
// context
import { useAuthContext } from "@/context/hook/use-auth-context";
import { useThemeContext } from "@/context/hook/use-theme-context";
// screen
import BundleView from "@/screen/shop/bundle";
import DailyShop from "@/screen/shop/daily-shop";
import NightMarket from "@/screen/shop/night-market";
import PluginStore from "@/screen/shop/plugin-store";

const Tab = createMaterialTopTabNavigator();

const Store = () => {

    const { colors } = useThemeContext();

    const { shop: { nightMarket, plugins } } = useAuthContext();

    const tabNavigatorOptions = {
        initialRouteName: "Offers",
        screenOptions: {
            swipeEnabled: false,
            tabBarGap: 8,
            tabBarItemStyle: {
                width: "auto",
                minWidth: 100,
                paddingHorizontal: 0
            },
            tabBarStyle: {
                backgroundColor: "#1B1D21",
                paddingHorizontal: 8
            },
            tabBarLabelStyle: {
                fontSize: 16,
                letterSpacing: .5,
                lineHeight: 24,
                marginHorizontal: 0
            },
            tabBarScrollEnabled: true,
            tabBarActiveTintColor: colors.text,
            tabBarInactiveTintColor: "#7B7D80",
            tabBarIndicatorStyle: {
                backgroundColor: colors.primary,
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50
            },
            tabBarIndicatorContainerStyle: {
                marginLeft: 8
            }
        }
    };

    return (
        <View style={{ flex: 1, gap: 8 }}>
            <Text variant="displaySmall" style={{ fontFamily: "DrukWide", paddingHorizontal: 16 }}>STORE</Text>
            {/* @ts-ignore */}
            <Tab.Navigator {...tabNavigatorOptions}>
                <Tab.Screen name="Featured collection" component={BundleView} />
                <Tab.Screen name="Offers" component={DailyShop} />
                {nightMarket?.BonusStoreOffers && <Tab.Screen name="Night market" component={NightMarket} />}
                {plugins && <Tab.Screen name="Plugins" component={PluginStore} />}
            </Tab.Navigator>
        </View>
    );
};

export default Store;
