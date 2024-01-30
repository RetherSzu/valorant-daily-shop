import { ReactElement } from "react";
import { StatusBar, Text, View } from "react-native";
// context
import { ThemeProvider } from "@/context/theme/theme-provider";
import { useThemeContext } from "@/context/hook/use-theme-context";

export default function App(): ReactElement {

    const { colors } = useThemeContext();

    return (
        <ThemeProvider>
            <View className="flex-1 items-center justify-center" style={{ backgroundColor: colors.background }}>
                <StatusBar barStyle="light-content" backgroundColor={colors.background} />
                <Text style={{ color: colors.text }}>Open up App.tsx to start working on your app!</Text>
            </View>
        </ThemeProvider>
    );
}
