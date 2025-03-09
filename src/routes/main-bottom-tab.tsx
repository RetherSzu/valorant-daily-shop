import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
// components
import SvgShop from "@/components/icon/shop";
import SvgUser from "@/components/icon/user";
import SvgUsers from "@/components/icon/users";
// contexts
import useAuthContext from "@/contexts/hook/use-auth-context";
import useThemeContext from "@/contexts/hook/use-theme-context";
// routes
import Header from "@/routes/navigation/header";
import StoreStackScreen from "@/routes/store-stack-screen";
// screens
import ProfileScreen from "@/screens/profile/profile-screen";
// types
import { EAuthContextType } from "@/types/context/auth";

const BottomNavigation = createMaterialBottomTabNavigator();

const MainBottomTab = () => {

    const { colors } = useThemeContext();

    const { dispatch } = useAuthContext();

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
                    name="Accounts"
                    component={() => null}
                    options={{
                        tabBarIcon: ({ color }) => <SvgUsers color={color} />,
                    }}
                    listeners={{
                        tabPress: async () => {
                            await AsyncStorage.removeItem("current_user");
                            dispatch({
                                type: EAuthContextType.INITIAL,
                                payload: {
                                    currentUser: null,
                                },
                            });
                        },
                    }}
                />
            </BottomNavigation.Navigator>
        </>
    );
};

export default MainBottomTab;
