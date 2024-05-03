import React, { ReactElement } from "react";
import { View } from "react-native";
// component
import Button from "@/component/button/button";
import TitleScreen from "@/component/typography/title-screen";
// context
import useAuthContext from "@/context/hook/use-auth-context";
import useThemeContext from "@/context/hook/use-theme-context";

const Settings = (): ReactElement => {

    const { colors } = useThemeContext();

    const { logout } = useAuthContext();

    return (
        <View
            style={{
                gap: 16,
                flex: 1,
                padding: 16,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.primary,
            }}
        >
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                <TitleScreen name="SETTINGS" />
            </View>
            <View
                style={{
                    gap: 16,
                    flex: 1,
                    padding: 16,
                    width: "100%",
                    borderRadius: 32,
                    backgroundColor: "#1F2326",
                    flexDirection: "column-reverse",
                }}
            >
                <Button
                    text="Logout"
                    onPress={logout}
                    backgroundColor={colors.primary}
                    underlayColor="#222429"
                />
            </View>
        </View>
    );
};

export default Settings;
