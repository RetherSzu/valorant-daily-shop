import { StatusBar, Text, View } from "react-native";
// context
import { useThemeContext } from "@/context/hook/use-theme-context";

const Login = () => {

    const { colors } = useThemeContext();

    return (
        <View className="flex-1 items-center justify-center" style={{ backgroundColor: colors.background }}>
            <StatusBar barStyle="light-content" backgroundColor={colors.background} />
            <Text style={{ color: colors.text }}>Login</Text>
        </View>
    );
};

export default Login;
