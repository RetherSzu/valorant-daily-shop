import { View } from "react-native";
// components
import Text from "@/components/typography/text";
// contexts
import useThemeContext from "@/contexts/hook/use-theme-context";

const UnsupportedMultifactor = () => {

    const { colors } = useThemeContext();

    return (
        <View style={{ backgroundColor: colors.background, flex: 1, justifyContent: "center", padding: 32, gap: 32 }}>
            <Text style={{ color: colors.text, fontFamily: "Vandchrome" }} variant="displayLarge">
                Unsupported Multifactor
            </Text>
            <Text variant="headlineLarge">
                This app does not support multifactor authentication.
            </Text>
            <Text style={{ color: colors.primary }} variant="titleLarge">
                We are currently working on it. We apologize for the inconvenience.
            </Text>
        </View>
    );
};

export default UnsupportedMultifactor;