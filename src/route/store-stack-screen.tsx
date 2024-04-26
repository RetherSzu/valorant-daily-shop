import React, { ReactElement } from "react";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// route
import Header from "@/route/navigation/header";
// screen
import Store from "@/screen/shop/store";
import SkinDetails from "@/screen/offer-details/skin-details";
// type
import { NavigationStoreProp, StoreStackParamList } from "@/type/router/navigation";

const StoreStack = createNativeStackNavigator<StoreStackParamList>();

const StoreStackScreen = (): ReactElement => {

    const navigation = useNavigation<NavigationStoreProp>();

    return (
        <StoreStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#1B1D21",
                },
                headerTintColor: "#fff",
                headerShadowVisible: false,
                contentStyle: {
                    backgroundColor: "#1B1D21",
                },
                title: "",
                "header": () => <Header />,
            }}
        >
            <StoreStack.Screen name="StoreStack" component={Store} />
            <StoreStack.Screen
                name="SkinDetails"
                component={SkinDetails}
                options={{
                    header: () => <Header
                        leftComponent={
                            <IconButton
                                size={32}
                                iconColor="#fff"
                                icon="arrow-left"
                                onPress={() => navigation.goBack()}
                            />
                        }
                    />,
                }}
            />
        </StoreStack.Navigator>
    );
};

export default StoreStackScreen;
