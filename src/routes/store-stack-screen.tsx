import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
// api
import valorantProvider from "@/api/valorant-provider";
// contexts
import useUserContext from "@/contexts/hook/use-user-context";
import useAuthContext from "@/contexts/hook/use-auth-context";
import useBundleContext from "@/contexts/hook/use-bundle-context";
import usePluginContext from "@/contexts/hook/use-plugin-context";
import useDailyShopContext from "@/contexts/hook/use-daily-shop-context";
import useNightMarketContext from "@/contexts/hook/use-night-market-context";
// screens
import Store from "@/screens/shop/store";
// types
import { StoreStackParamList } from "@/types/router/navigation";
import useAccessoryStoreContext from "@/contexts/hook/use-accessory-store-context";
import Loading from "@/components/loading/loading";

const StoreStack = createNativeStackNavigator<StoreStackParamList>();

const StoreStackScreen = (): ReactElement | null => {

    const { logout } = useAuthContext();

    const { initialize } = useUserContext();

    const { setDailyShop } = useDailyShopContext();

    const { setNightMarket } = useNightMarketContext();

    const { setBundles } = useBundleContext();

    const { setPlugins } = usePluginContext();

    const { setAccessoryStore } = useAccessoryStoreContext();

    const [fetchShop, setFetchShop] = useState(false);

    const getShopData = useCallback(async () => {
        setFetchShop(true);
        try {
            const shopData = await valorantProvider.getFrontShop();

            if (!shopData) return;

            // Dispatch the shop data to the context.
            setBundles(shopData.bundles);
            setPlugins(shopData.plugins);
            setDailyShop(shopData.offers);
            setNightMarket(shopData.nightMarket);
            setAccessoryStore(shopData.accessoryStore);
        } catch (error) {
            await logout();
            console.error("Failed to fetch shop data", error);
        }
        setFetchShop(false);
    }, []);

    useEffect(() => {
        // Initialize user data
        (() => initialize())();
        // Fetch shop data
        (() => getShopData())();
    }, []);

    if (fetchShop) return <Loading />;

    return (
        <StoreStack.Navigator screenOptions={{ headerShown: false }}>
            <StoreStack.Screen name="StoreStack" component={Store} />
        </StoreStack.Navigator>
    );
};

export default StoreStackScreen;
