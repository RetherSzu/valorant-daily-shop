import { useFonts } from "expo-font";
import { ReactElement } from "react";
import * as SplashScreen from "expo-splash-screen";
// context
import { AuthProvider } from "@/context/auth/auth-provider";
import { ThemeProvider } from "@/context/theme/theme-provider";
// route
import Router from "@/route/index";

export default function App(): ReactElement | null {

    const [fontsLoaded, fontError] = useFonts({
        Inter: require("./assets/fonts/Inter.ttf"),
        DrukWide: require("./assets/fonts/Druk-Wide-Bold.ttf"),
    });

    if (!fontsLoaded && !fontError) return null;

    (async () => SplashScreen.hideAsync())();

    return (
        <ThemeProvider>
            <AuthProvider>
                <Router />
            </AuthProvider>
        </ThemeProvider>
    );
}
