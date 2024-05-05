import { View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// components
import Text from "@/components/typography/text";
// contexts
import useUserContext from "@/contexts/hook/use-user-context";
import useThemeContext from "@/contexts/hook/use-theme-context";
import usePluginContext from "@/contexts/hook/use-plugin-context";
import useNightMarketContext from "@/contexts/hook/use-night-market-context";
// screens
import BundleView from "@/screens/shop/bundle";
import DailyShop from "@/screens/shop/daily-shop";
import NightMarket from "@/screens/shop/night-market";
import PluginStore from "@/screens/shop/plugin-store";
import AccessoryStore from "@/screens/shop/accessory-store";

const Tab = createMaterialTopTabNavigator();

const Store = () => {

    const { colors } = useThemeContext();

    const { plugins } = usePluginContext();

    const { nightMarket } = useNightMarketContext();

    const { gameName, tagLine } = useUserContext();

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
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 16,
                }}
            >
                <Text variant="displayMedium" style={{ fontFamily: "Vandchrome" }}>STORE</Text>
                {gameName && tagLine && <Text variant="titleSmall" style={{ opacity: .5 }}>{gameName} #{tagLine}</Text>}
            </View>
            {/* @ts-ignore */}
            <Tab.Navigator {...tabNavigatorOptions}>
                <Tab.Screen name="Bundles" component={BundleView} />
                <Tab.Screen name="Daily shop" component={DailyShop} />
                <Tab.Screen name="Accessory shop" component={AccessoryStore} />
                {nightMarket?.BonusStoreOffers && <Tab.Screen name="Night market" component={NightMarket} />}
                {plugins && <Tab.Screen name="E-sport" component={PluginStore} />}
            </Tab.Navigator>
        </View>
    );
};

export default Store;
