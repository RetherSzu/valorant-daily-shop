import { View } from "react-native";
import React, { ReactElement } from "react";
import { useNavigation } from "@react-navigation/native";
// components
import Button from "@/components/button/button";
import TitleScreen from "@/components/typography/title-screen";
// contexts
import useThemeContext from "@/contexts/hook/use-theme-context";
// types
import { NavigationProp } from "@/types/router/navigation";

const Settings = (): ReactElement => {

    const { colors } = useThemeContext();

    const navigate = useNavigation<NavigationProp>();

    const handleLogout = () => navigate.navigate("Logout");

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
                    onPress={handleLogout}
                    backgroundColor={colors.primary}
                    underlayColor="#222429"
                />
            </View>
        </View>
    );
};

export default Settings;
