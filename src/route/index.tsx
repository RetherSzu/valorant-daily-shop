import { StatusBar } from "react-native";
import React, { ReactElement } from "react";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// api
import { useGetThemeByIdQuery } from "@/api/rtk-valorant-api";
// context
import useAuthContext from "@/context/hook/use-auth-context";
import useThemeContext from "@/context/hook/use-theme-context";
// screens
import Login from "@/screen/auth/login";
import Plugin from "@/screen/plugin/plugin";
import SkinDetails from "@/screen/offer-details/skin-details";
import PlayerCardDetails from "@/screen/offer-details/player-card-details";
import BuddyDetails from "@/screen/offer-details/buddy-details";
import SprayDetails from "@/screen/offer-details/spray-details";
import UnsupportedMultifactor from "@/screen/auth/unsupported-multifactor";
// route
import StoreTab from "@/route/store-tab";
import Header from "@/route/navigation/header";
// type
import { RootStackParamList } from "@/type/router/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Router = (): ReactElement | null => {

    // Call the useGetThemeByIdQuery hook to obtain theme data to improve performance.
    const {
        isLoading: isLoadingTheme,
    } = useGetThemeByIdQuery("");

    const { accessToken, entitlementsToken, isInitialized } = useAuthContext();

    const { colors } = useThemeContext();

    const navigation = useNavigation();

    if (!isInitialized || isLoadingTheme) return null;

    const optionsDetailsScreen: {
        animation: "ios";
        headerShown: boolean;
        header: () => ReactElement;
        animationTypeForReplace: "pop";
    } = {
        headerShown: true,
        header: () => (
            <Header leftComponent={
                <IconButton
                    size={32}
                    iconColor="#fff"
                    icon="arrow-left"
                    onPress={() => navigation.goBack()}
                />
            } />
        ),
        animation: "ios",
        animationTypeForReplace: "pop",
    };

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
                        <Stack.Screen name="Plugin" component={Plugin} options={{
                            animationTypeForReplace: "pop",
                            animation: "ios",
                        }} />
                        <Stack.Screen
                            name="SkinDetails"
                            component={SkinDetails}
                            options={optionsDetailsScreen}
                        />
                        <Stack.Screen
                            name="PlayerCardDetails"
                            component={PlayerCardDetails}
                            options={optionsDetailsScreen}
                        />
                        <Stack.Screen
                            name="BuddyDetails"
                            component={BuddyDetails}
                            options={optionsDetailsScreen}
                        />

                        <Stack.Screen
                            name="SprayDetails"
                            component={SprayDetails}
                            options={optionsDetailsScreen}
                        />
                    </>
                )}
            </Stack.Navigator>
        </>
    );
};

export default Router;
