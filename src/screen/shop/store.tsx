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
        initialRouteName: "Daily shop",
        screenOptions: {
            swipeEnabled: false,
            tabBarGap: 8,
            tabBarItemStyle: {
                width: "auto",
                minWidth: 110,
                paddingHorizontal: 4,
            },
            tabBarStyle: {
                backgroundColor: "#1B1D21",
                paddingHorizontal: 8,
            },
            tabBarLabelStyle: {
                fontSize: 16,
                letterSpacing: .5,
                lineHeight: 24,
                marginHorizontal: 0,
                fontFamily: "Nota",
            },
            tabBarScrollEnabled: true,
            tabBarActiveTintColor: colors.text,
            tabBarInactiveTintColor: "#7B7D80",
            tabBarIndicatorStyle: {
                backgroundColor: colors.primary,
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
            },
            tabBarIndicatorContainerStyle: {
                marginLeft: 8,
            },
        },
    };

    return (
        <View style={{ flex: 1 }}>
            <Text variant="displayLarge" style={{ fontFamily: "Vandchrome", paddingHorizontal: 16 }}>STORE</Text>
            {/* @ts-ignore */}
            <Tab.Navigator {...tabNavigatorOptions}>
                <Tab.Screen name="Bundles" component={BundleView} />
                <Tab.Screen name="Daily shop" component={DailyShop} />
                {nightMarket?.BonusStoreOffers && <Tab.Screen name="Night market" component={NightMarket} />}
                {plugins && <Tab.Screen name="E-sport" component={PluginStore} />}
            </Tab.Navigator>
        </View>
    );
};

export default Store;
