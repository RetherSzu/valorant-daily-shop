import React, { ReactElement } from "react";
import { ScrollView, View } from "react-native";
// component
import Button from "@/component/button/button";
import TitleScreen from "@/component/typography/title-screen";
// context
import { useAuthContext } from "@/context/hook/use-auth-context";
import { useThemeContext } from "@/context/hook/use-theme-context";

const Settings = (): ReactElement => {

    const { colors } = useThemeContext();

    const { logout } = useAuthContext();

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.primary,
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
            gap: 16
        }}>
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                <TitleScreen name="SETTINGS" />
            </View>
            <ScrollView
                style={{
                    backgroundColor: "#1F2326",
                    padding: 16,
                    borderRadius: 20,
                    width: "100%"
                }}
                contentContainerStyle={{
                    gap: 16,
                    justifyContent: "space-between"
                }}
                showsVerticalScrollIndicator={false}
            >
                <Button
                    text="Logout"
                    onPress={logout}
                    backgroundColor={colors.primary}
                    underlayColor="#222429"
                />
            </ScrollView>
        </View>
    );
};

export default Settings;
