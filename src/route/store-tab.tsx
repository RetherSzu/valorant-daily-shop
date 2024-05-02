import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// route
import StoreStackScreen from "@/route/store-stack-screen";
import BottomTabBar from "@/route/navigation/bottom-tab-bar";
// screen
import Settings from "@/screen/settings";
import Header from "@/route/navigation/header";

const Tab = createBottomTabNavigator();

const StoreTab = () => {
    return (
        <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />} screenOptions={{ "header": () => <Header /> }}>
            <Tab.Screen name="Store" component={StoreStackScreen} />
            <Tab.Screen options={{ headerShown: false }} name="Settings" component={Settings} />
        </Tab.Navigator>
    );
};

export default StoreTab;
