import React from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// context
import { useAuthContext } from "@/context/hook/use-auth-context";
import { useThemeContext } from "@/context/hook/use-theme-context";
// screens
import Login from "@/screen/auth/login";
import UnsupportedMultifactor from "@/screen/auth/unsupported-multifactor";
// route
import StoreTab from "@/route/store-tab";

const Stack = createNativeStackNavigator();

const Router = () => {

    const state = useAuthContext();

    const { colors } = useThemeContext();

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={colors.background} />
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
                {state.accessToken == null || state.entitlementsToken == null ? (
                    <>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Multifactor" component={UnsupportedMultifactor} />
                    </>
                ) : (
                    <Stack.Screen name="Home" component={StoreTab} />
                )}
            </Stack.Navigator>
        </>
    );
};

export default Router;
