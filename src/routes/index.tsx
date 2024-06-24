import { StatusBar } from "react-native";
import React, { ReactElement } from "react";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// api
import { useGetThemeByIdQuery } from "@/api/rtk-valorant-api";
// components
import LogoutWebView from "@/components/web-view/web-view-logout";
import LoginWebView from "@/components/web-view/web-view-login";
// contexts
import useAuthContext from "@/contexts/hook/use-auth-context";
import useThemeContext from "@/contexts/hook/use-theme-context";
// screens
import Plugin from "@/screens/plugin/plugin";
import SkinDetails from "@/screens/offer-details/skin-details";
import BuddyDetails from "@/screens/offer-details/buddy-details";
import SprayDetails from "@/screens/offer-details/spray-details";
import PlayerCardDetails from "@/screens/offer-details/player-card-details";
import CollectionDetailsScreen from "@/screens/profile/collection/collection-details-screen";
// routes
import Header from "@/routes/navigation/header";
import MainBottomTab from "@/routes/main-bottom-tab";
// types
import { RootStackParamList } from "@/types/router/navigation";

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
                        <Stack.Screen name="Login" component={LoginWebView} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Home" component={MainBottomTab} />

                        <Stack.Screen name="Logout" component={LogoutWebView} />

                        <Stack.Screen
                            name="Plugin"
                            component={Plugin}
                            options={{
                                animation: "ios",
                                animationTypeForReplace: "pop",
                            }}
                        />

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

                        <Stack.Screen
                            name="CollectionDetails"
                            component={CollectionDetailsScreen}
                            options={optionsDetailsScreen}
                        />
                    </>
                )}
            </Stack.Navigator>
        </>
    );
};

export default Router;
