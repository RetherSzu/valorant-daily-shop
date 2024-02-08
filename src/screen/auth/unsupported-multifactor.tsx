import { View } from "react-native";
import { Text } from "react-native-paper";
// context
import { useThemeContext } from "@/context/hook/use-theme-context";

const UnsupportedMultifactor = () => {

    const { colors } = useThemeContext();

    return (
        <View className="flex-1 justify-center p-8 gap-8" style={{ backgroundColor: colors.background }}>
            <Text style={{ color: colors.text, fontFamily: "DrukWide" }} variant="headlineLarge">
                Unsupported Multifactor
            </Text>
            <Text style={{ color: colors.text, fontFamily: "DrukWide", textAlign: "justify" }} variant="titleMedium">
                This app does not support multifactor authentication.
            </Text>
            <Text style={{ color: colors.primary, fontFamily: "Inter"}} variant="titleMedium">
                We are currently working on it. We apologize for the inconvenience.
            </Text>
        </View>
    );
};

export default UnsupportedMultifactor;
