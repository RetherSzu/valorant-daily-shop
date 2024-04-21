import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { ReactElement, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
// context
import { AuthProvider } from "@/context/auth/auth-provider";
import { ThemeProvider } from "@/context/theme/theme-provider";
import { useAuthContext } from "@/context/hook/use-auth-context";
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
        Inter: require("./assets/fonts/Inter.ttf"),
        DrukWide: require("./assets/fonts/Druk-Wide-Bold.ttf")
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
                        <Router />
                    </AuthProvider>
                </ThemeProvider>
            </Provider>
        </NavigationContainer>
    );
}
