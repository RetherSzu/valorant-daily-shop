import React, { ReactElement } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// route
import Header from "@/route/navigation/header";
// screen
import Store from "@/screen/shop/store";

const StoreStack = createNativeStackNavigator();

const StoreStackScreen = (): ReactElement => {
    return (
        <StoreStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: "#1B1D21"
            },
            headerTintColor: "#fff",
            headerShadowVisible: false,
            contentStyle: {
                backgroundColor: "#1B1D21"
            },
            title: "",
            "header": () => <Header />
        }}>
            <StoreStack.Screen name="StoreStack" component={Store} />
        </StoreStack.Navigator>
    );
};

export default StoreStackScreen;
