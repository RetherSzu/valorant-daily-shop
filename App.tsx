import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { ReactElement, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
// context
import AuthProvider from "@/context/auth/auth-provider";
import UserProvider from "@/context/user/user-provider";
import ThemeProvider from "@/context/theme/theme-provider";
import useAuthContext from "@/context/hook/use-auth-context";
import BundleProvider from "@/context/bundle/bundle-provider";
import PluginProvider from "@/context/plugin/plugin-provider";
import SnackbarProvider from "@/context/snackbar/snackbar-provider";
import DailyShopProvider from "@/context/daily-shop/daily-shop-provider";
import NightMarketProvider from "@/context/night-market/night-market-provider";
// controller
import { store } from "@/controller/store";
// route
import Router from "@/route/index";

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
                    <SnackbarProvider>
                        <AuthProvider>
                            <UserProvider>
                                <DailyShopProvider>
                                    <BundleProvider>
                                        <NightMarketProvider>
                                            <PluginProvider>
                                                <Router />
                                            </PluginProvider>
                                        </NightMarketProvider>
                                    </BundleProvider>
                                </DailyShopProvider>
                            </UserProvider>
                        </AuthProvider>
                    </SnackbarProvider>
                </ThemeProvider>
            </Provider>
        </NavigationContainer>
    );
}
