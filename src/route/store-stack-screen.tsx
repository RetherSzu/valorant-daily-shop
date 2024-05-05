import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
// api
import valorantProvider from "@/api/valorant-provider";
// context
import useUserContext from "@/context/hook/use-user-context";
import useAuthContext from "@/context/hook/use-auth-context";
import useBundleContext from "@/context/hook/use-bundle-context";
import usePluginContext from "@/context/hook/use-plugin-context";
import useDailyShopContext from "@/context/hook/use-daily-shop-context";
import useNightMarketContext from "@/context/hook/use-night-market-context";
// screen
import Store from "@/screen/shop/store";
// type
import { StoreStackParamList } from "@/type/router/navigation";
import useAccessoryStoreContext from "@/context/hook/use-accessory-store-context";

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
            // const e: AxiosError<{
            //     "httpStatus": number,
            //     "errorCode": string,
            //     "message": string
            // }, Record<any, any>> = error as AxiosError;

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

    if (fetchShop) return null;

    return (
        <StoreStack.Navigator screenOptions={{ headerShown: false }}>
            <StoreStack.Screen name="StoreStack" component={Store} />
        </StoreStack.Navigator>
    );
};

export default StoreStackScreen;
