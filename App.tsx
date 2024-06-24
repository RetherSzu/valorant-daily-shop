//
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { ReactElement, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
// contexts
import AuthProvider from "@/contexts/auth/auth-provider";
import UserProvider from "@/contexts/user/user-provider";
import ThemeProvider from "@/contexts/theme/theme-provider";
import useAuthContext from "@/contexts/hook/use-auth-context";
import BundleProvider from "@/contexts/bundle/bundle-provider";
import PluginProvider from "@/contexts/plugin/plugin-provider";
import ProfileProvider from "@/contexts/profile/profile-provider";
import DailyShopProvider from "@/contexts/daily-shop/daily-shop-provider";
import NightMarketProvider from "@/contexts/night-market/night-market-provider";
import AccessoryStoreProvider from "@/contexts/accessory-store/accessory-store-provider";
// controllers
import { store } from "@/controllers/store";
// moti
import "react-native-reanimated";
// routes
import Router from "@/routes/index";

export default function App(): ReactElement | null {

    const { isInitialized } = useAuthContext();

    useEffect(() => {
        if (isInitialized) (async () => SplashScreen.hideAsync())();
    }, [isInitialized]);

    const [fontsLoaded, fontError] = useFonts({
        DrukWide: require("./assets/fonts/Druk-Wide-Bold.ttf"),
        Vandchrome: require("./assets/fonts/vanchrome-regular.otf"),
        Nota: require("./assets/fonts/nota-bold.ttf"),
    });

    if (!fontsLoaded && !fontError) return null;

    const MyTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: "#1B1D21",
        },
    };

    return (
        <NavigationContainer theme={MyTheme}>
            <Provider store={store}>
                <ThemeProvider>
                    <AuthProvider>
                        <UserProvider>
                            <DailyShopProvider>
                                <BundleProvider>
                                    <AccessoryStoreProvider>
                                        <NightMarketProvider>
                                            <PluginProvider>
                                                <ProfileProvider>
                                                    <Router />
                                                </ProfileProvider>
                                            </PluginProvider>
                                        </NightMarketProvider>
                                    </AccessoryStoreProvider>
                                </BundleProvider>
                            </DailyShopProvider>
                        </UserProvider>
                    </AuthProvider>
                </ThemeProvider>
            </Provider>
        </NavigationContainer>
    );
}
