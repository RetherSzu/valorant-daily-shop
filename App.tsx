import { useFonts } from "expo-font";
import { ReactElement, useEffect } from "react";
import { Provider } from "react-redux";
import * as SplashScreen from "expo-splash-screen";
// context
import { AuthProvider } from "@/context/auth/auth-provider";
import { ThemeProvider } from "@/context/theme/theme-provider";
// controller
import { store } from "@/controller/store";
// route
import Router from "@/route/index";
import { NavigationContainer } from "@react-navigation/native";
import { useAuthContext } from "@/context/hook/use-auth-context";

export default function App(): ReactElement | null {

    const { isInitialized } = useAuthContext();

    useEffect(() => {
        if (isInitialized) (async () => SplashScreen.hideAsync())();
    }, [isInitialized]);

    const [fontsLoaded, fontError] = useFonts({
        Inter: require("./assets/fonts/Inter.ttf"),
        DrukWide: require("./assets/fonts/Druk-Wide-Bold.ttf")
    });

    if (!fontsLoaded && !fontError) return null;

    return (
        <NavigationContainer>
            <Provider store={store}>
                <ThemeProvider>
                    <AuthProvider>
                        <Router />
                    </AuthProvider>
                </ThemeProvider>
            </Provider>
        </NavigationContainer>
    );
}
