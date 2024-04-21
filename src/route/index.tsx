import React from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// context
import { useAuthContext } from "@/context/hook/use-auth-context";
import { useThemeContext } from "@/context/hook/use-theme-context";
// screens
import Login from "@/screen/auth/login";
import Plugin from "@/screen/plugin/plugin";
import UnsupportedMultifactor from "@/screen/auth/unsupported-multifactor";
// route
import StoreTab from "@/route/store-tab";
// type
import { RootStackParamList } from "@/type/router/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Router = () => {

    const { accessToken, entitlementsToken, isInitialized } = useAuthContext();

    const { colors } = useThemeContext();

    if (!isInitialized) return null;

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={colors.background} />
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
                {accessToken == null || entitlementsToken == null ? (
                    <>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Multifactor" component={UnsupportedMultifactor} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Home" component={StoreTab} />
                        <Stack.Screen name="Plugin" component={Plugin} />
                    </>
                )}
            </Stack.Navigator>
        </>
    );
};

export default Router;
