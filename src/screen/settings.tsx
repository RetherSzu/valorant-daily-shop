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
        <View className="flex-1 items-center justify-center p-8 gap-8" style={{ backgroundColor: colors.primary }}>
            <View className="flex-row items-start w-full">
                <TitleScreen name="SETTINGS" />
            </View>
            <ScrollView
                className="flex-1 w-full"
                style={{
                    backgroundColor: "#1F2326",
                    padding: 16,
                    borderRadius: 20,
                    height: "100%"
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
