import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// context
import { useAuthContext } from "@/context/hook/use-auth-context";
// screens
import Home from "@/screen/home";
import Login from "@/screen/auth/login";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const Router = () => {

    const state = useAuthContext();

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
                {state.accessToken == null || state.entitlementToken == null ? (
                    <Stack.Screen name="Login" component={Login} />
                ) : (
                    <Stack.Screen name="Home" component={Home} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Router;
