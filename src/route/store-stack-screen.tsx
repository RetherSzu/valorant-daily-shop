import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// api
import valorantProvider from "@/api/valorant-provider";
// context
import useUserContext from "@/context/hook/use-user-context";
import useBundleContext from "@/context/hook/use-bundle-context";
import usePluginContext from "@/context/hook/use-plugin-context";
import useDailyShopContext from "@/context/hook/use-daily-shop-context";
import useNightMarketContext from "@/context/hook/use-night-market-context";
// route
import Header from "@/route/navigation/header";
// screen
import Store from "@/screen/shop/store";
import SkinDetails from "@/screen/offer-details/skin-details";
// type
import { NavigationStoreProp, StoreStackParamList } from "@/type/router/navigation";

const StoreStack = createNativeStackNavigator<StoreStackParamList>();

const StoreStackScreen = (): ReactElement | null => {

    const { initialize } = useUserContext();

    const { setDailyShop } = useDailyShopContext();

    const { setNightMarket } = useNightMarketContext();

    const { setBundles } = useBundleContext();

    const { setPlugins } = usePluginContext();

    const [fetchShop, setFetchShop] = useState(false);

    const getShopData = useCallback(async () => {
        setFetchShop(true);
        try {
            const shopData = await valorantProvider.getFrontShop();

            if (!shopData) return;

            // Dispatch the shop data to the context.
            setDailyShop(shopData.offers);
            setNightMarket(shopData.nightMarket);
            setBundles(shopData.bundles);
            setPlugins(shopData.plugins);
        } catch (error) {
            console.error("Failed to fetch shop data", error);
        }
        setFetchShop(false);
    }, []);

    useEffect(() => {
        // Initialize user data
        initialize();
        // Fetch shop data
        (() => getShopData())();
    }, []);

    const navigation = useNavigation<NavigationStoreProp>();

    if (fetchShop) return null;

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
