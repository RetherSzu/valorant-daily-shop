import React from "react";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
// components
import SvgShop from "@/components/icon/shop";
import SvgUser from "@/components/icon/user";
import SvgSetting from "@/components/icon/setting";
// contexts
import useThemeContext from "@/contexts/hook/use-theme-context";
// routes
import Header from "@/routes/navigation/header";
import StoreStackScreen from "@/routes/store-stack-screen";
// screens
import Settings from "@/screens/settings";
import ProfileScreen from "@/screens/profile/profile-screen";

const BottomNavigation = createMaterialBottomTabNavigator();

const MainBottomTab = () => {

    const { colors } = useThemeContext();

    return (
        <>
            <Header />
            <BottomNavigation.Navigator
                sceneAnimationEnabled
                initialRouteName="shop"
                inactiveColor="#7A7B7E"
                activeColor={colors.primary}
                sceneAnimationType="shifting"
                activeIndicatorStyle={{ backgroundColor: colors.card }}
                barStyle={{ justifyContent: "center", backgroundColor: "#1B1D21" }}
            >
                <BottomNavigation.Screen
                    name="shop"
                    component={StoreStackScreen}
                    options={{
                        tabBarIcon: ({ color }) => <SvgShop color={color} />,
                    }}
                />
                <BottomNavigation.Screen
                    name="profile"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ color }) => <SvgUser color={color} />,
                    }}
                />
                <BottomNavigation.Screen
                    name="settings"
                    component={Settings}
                    options={{
                        tabBarIcon: ({ color }) => <SvgSetting color={color} />,
                    }}
                />
            </BottomNavigation.Navigator>
        </>
    );
};

export default MainBottomTab;
