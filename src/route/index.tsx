import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// api
import valorantProvider from "@/api/valorant-provider";
import { useGetThemeByIdQuery } from "@/api/rtk-valorant-api";
// context
import useAuthContext from "@/context/hook/use-auth-context";
import useThemeContext from "@/context/hook/use-theme-context";
import useBundleContext from "@/context/hook/use-bundle-context";
import usePluginContext from "@/context/hook/use-plugin-context";
import useDailyShopContext from "@/context/hook/use-daily-shop-context";
import useNightMarketContext from "@/context/hook/use-night-market-context";
// screens
import Login from "@/screen/auth/login";
import Plugin from "@/screen/plugin/plugin";
import UnsupportedMultifactor from "@/screen/auth/unsupported-multifactor";
// route
import StoreTab from "@/route/store-tab";
// type
import { RootStackParamList } from "@/type/router/navigation";
import useUserContext from "@/context/hook/use-user-context";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Router = (): ReactElement | null => {

    // Call the useGetThemeByIdQuery hook to obtain theme data to improve performance.
    const {
        isLoading: isLoadingTheme,
    } = useGetThemeByIdQuery("");

    const { accessToken, entitlementsToken, isInitialized, isSignout } = useAuthContext();

    const { colors } = useThemeContext();


    if (!isInitialized || isLoadingTheme) return null;

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
