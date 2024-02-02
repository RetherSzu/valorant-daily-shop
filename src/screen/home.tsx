import { StatusBar, Text, View } from "react-native";
// component
import Button from "@/component/button/button";
// context
import { useAuthContext } from "@/context/hook/use-auth-context";
import { useThemeContext } from "@/context/hook/use-theme-context";

const Home = () => {

    const { colors } = useThemeContext();

    const { logout } = useAuthContext();

    return (
        <View className="flex-1 items-center justify-center p-8 gap-8" style={{ backgroundColor: colors.background }}>
            <StatusBar barStyle="light-content" backgroundColor={colors.background} />
            <Text style={{ color: colors.text }}>Home</Text>
            <Button
                text="Logout"
                onPress={logout}
                backgroundColor={colors.primary}
                underlayColor="#222429"
            />
        </View>
    );
};

export default Home;
