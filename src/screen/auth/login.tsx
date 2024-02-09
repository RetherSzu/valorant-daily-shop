import { View } from "react-native";
import { Checkbox } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import { ReactElement, useEffect, useState } from "react";
// component
import Button from "@/component/button/button";
import SvgAvatar from "@/component/icon/avatar";
import TextInput from "@/component/input/text-input";
import Typography from "@/component/typography/typography";
import EyePasswordButton from "@/component/button/eye-password-button";
// context
import { useAuthContext } from "@/context/hook/use-auth-context";
import { useThemeContext } from "@/context/hook/use-theme-context";

const Login = (): ReactElement => {

    const { colors } = useThemeContext();

    const { login } = useAuthContext();

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [staySignIn, setStaySignIn] = useState(SecureStore.getItem("stay_sign_in") ?? false);

    const [show, setShow] = useState(true);

    const [isLoading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (username === "" || password === "") return;
        setLoading(true);

        if (staySignIn) {
            await SecureStore.setItemAsync("stay_sign_in", String(staySignIn));
            await SecureStore.setItemAsync("username", username);
            await SecureStore.setItemAsync("password", password);
        }

        // Ensure that the username and password was deleted
        if (!staySignIn) {
            await SecureStore.deleteItemAsync("stay_sign_in");
            await SecureStore.deleteItemAsync("username");
            await SecureStore.deleteItemAsync("password");
        }

        await login(username, password);

        setLoading(false);
    };

    useEffect(() => {
        const getStoredCredentials = async () => {
            const storedUsername = await SecureStore.getItemAsync("username");
            const storedPassword = await SecureStore.getItemAsync("password");
            const storedStaySignIn = await SecureStore.getItemAsync("stay_sign_in");

            if (storedUsername) setUsername(storedUsername);
            if (storedPassword) setPassword(storedPassword);

            if (storedStaySignIn) await handleLogin();
        };
        (async () => getStoredCredentials())();
    }, []);

    return (
        <View className="flex-1 justify-center p-4 gap-4" style={{ backgroundColor: colors.background }}>
            <Typography variant="h1">Sign in</Typography>
            <View className="flex-1" style={{ gap: 16 }}>
                <TextInput
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    icon={<SvgAvatar color={colors.text} />}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    style={{ flexDirection: "row-reverse" }}
                    icon={<EyePasswordButton show={show} onPress={() => setShow(!show)} />}
                    secureTextEntry={show}
                />
                <View className="flex flex-row items-center">
                    <Checkbox
                        status={staySignIn ? "checked" : "unchecked"}
                        onPress={() => setStaySignIn(!staySignIn)}
                        uncheckedColor="#222429"
                        color={colors.primary}
                    />
                    <Typography variant="body1">Stay sign in ?</Typography>
                </View>
            </View>
            <Button
                text="Login in"
                onPress={handleLogin}
                backgroundColor={colors.primary}
                underlayColor="#222429"
                loading={isLoading}
            />
        </View>
    );
};

export default Login;
