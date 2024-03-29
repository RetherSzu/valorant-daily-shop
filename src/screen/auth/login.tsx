import * as Yup from "yup";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { Image, View } from "react-native";
import { Checkbox } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import { yupResolver } from "@hookform/resolvers/yup";
import { ReactElement, useEffect, useState } from "react";
// component
import Alert from "@/component/alert/alert";
import Button from "@/component/button/button";
import Text from "@/component/typography/text";
import RHFTextField from "@/component/hook-form/rhf-text-field";
import EyePasswordButton from "@/component/button/eye-password-button";
// context
import { useAuthContext } from "@/context/hook/use-auth-context";
import { useThemeContext } from "@/context/hook/use-theme-context";

const Login = (): ReactElement => {

    const { colors } = useThemeContext();

    const { login } = useAuthContext();

    const [staySignIn, setStaySignIn] = useState(SecureStore.getItem("stay_sign_in") ?? false);

    const [show, setShow] = useState(true);

    const [errorMsg, setErrorMsg] = useState("");

    const LoginSchema = Yup.object().shape({
        username: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required")
    });

    const defaultValues = {
        username: "",
        password: ""
    };

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting, errors },
        control,
        setValue
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            if (staySignIn) {
                await SecureStore.setItemAsync("stay_sign_in", String(staySignIn));
                await SecureStore.setItemAsync("username", data.username);
                await SecureStore.setItemAsync("password", data.password);
            } else {
                // Ensure that the username and password was deleted
                await SecureStore.deleteItemAsync("stay_sign_in");
                await SecureStore.deleteItemAsync("username");
                await SecureStore.deleteItemAsync("password");
            }

            await login(data.username, data.password);
        } catch (error: any) {
            reset();
            const axiosError = error as AxiosError;
            if (axiosError.response?.status === 401) {
                setErrorMsg("Invalid username or password");
                return;
            }
            setErrorMsg(typeof error === "string" ? error : error.message);
        }
    });

    useEffect(() => {
        const getStoredCredentials = async () => {
            const storedUsername = await SecureStore.getItemAsync("username");
            const storedPassword = await SecureStore.getItemAsync("password");
            const storedStaySignIn = await SecureStore.getItemAsync("stay_sign_in");

            if (storedUsername) setValue("username", storedUsername);
            if (storedPassword) setValue("password", storedPassword);

            if (storedStaySignIn) await onSubmit();
        };
        (async () => getStoredCredentials())();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: "center", padding: 16, gap: 32, backgroundColor: colors.background }}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                    source={require("../../../assets/icon.png")}
                    resizeMode="center"
                    style={{ width: 150, height: 150 }}
                />
            </View>
            <Text variant="displayMedium">Sign in</Text>
            <View style={{ flex: 1, gap: 16 }}>
                <RHFTextField
                    name="username"
                    // @ts-ignore
                    control={control}
                    placeholder="Username"
                />
                <RHFTextField
                    name="password"
                    // @ts-ignore
                    control={control}
                    secureTextEntry={show}
                    placeholder="Password"
                    style={{ flexDirection: "row-reverse" }}
                    icon={<EyePasswordButton show={show} onPress={() => setShow(!show)} />}
                />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Checkbox
                        color={colors.primary}
                        uncheckedColor="#222429"
                        onPress={() => setStaySignIn(!staySignIn)}
                        status={staySignIn ? "checked" : "unchecked"}
                    />
                    <Text variant="bodyMedium">Stay sign in ?</Text>
                </View>
                {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
                {!!errors.username && <Alert severity="warning">{errors.username.message}</Alert>}
                {!!errors.password && <Alert severity="warning">{errors.password.message}</Alert>}
                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                    <Button
                        text="Login in"
                        onPress={onSubmit}
                        loading={isSubmitting}
                        underlayColor="#222429"
                        backgroundColor={colors.primary}
                    />
                </View>
            </View>
        </View>
    );
};

export default Login;
