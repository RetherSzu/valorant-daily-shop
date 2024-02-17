import { View } from "react-native";
import { Text } from "react-native-paper";
// context
import { useThemeContext } from "@/context/hook/use-theme-context";

const UnsupportedMultifactor = () => {

    const { colors } = useThemeContext();

    return (
        <View style={{ backgroundColor: colors.background, flex: 1, justifyContent: "center", padding: 32, gap: 32 }}>
            <Text style={{ color: colors.text, fontFamily: "DrukWide" }} variant="headlineLarge">
                Unsupported Multifactor
            </Text>
            <Text style={{ color: colors.text, fontFamily: "DrukWide", textAlign: "justify" }} variant="titleMedium">
                This app does not support multifactor authentication.
            </Text>
            <Text style={{ color: colors.primary, fontFamily: "Inter" }} variant="titleMedium">
                We are currently working on it. We apologize for the inconvenience.
            </Text>
        </View>
    );
};

export default UnsupportedMultifactor;
