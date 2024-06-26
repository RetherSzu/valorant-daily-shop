import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// components
import TabHeader from "@/components/header/tab-header";
// contexts
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

    const tabNavigatorOptions = useMemo(() => ({
        initialRouteName: "Daily shop",
        screenOptions: {
            tabBarGap: 8,
            tabBarItemStyle: styles.tabBarItem,
            tabBarStyle: styles.tabBar,
            tabBarLabelStyle: styles.tabBarLabel,
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
            lazy: true,  // Enable lazy loading
        },
    }), [colors]);

    return (
        <View style={styles.container}>
            <TabHeader title="store" />
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBarItem: {
        width: "auto",
        minWidth: 110,
        paddingHorizontal: 4,
    },
    tabBar: {
        backgroundColor: "#1B1D21",
        paddingHorizontal: 8,
    },
    tabBarLabel: {
        fontSize: 16,
        letterSpacing: 0.5,
        lineHeight: 24,
        marginHorizontal: 0,
        fontFamily: "Nota",
    },
});

export default React.memo(Store);
