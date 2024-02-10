import React, { ReactElement } from "react";
import { Image, View } from "react-native";
// component
import Text from "@/component/typography/text";
// context
import { useAuthContext } from "@/context/hook/use-auth-context";
import { useThemeContext } from "@/context/hook/use-theme-context";

const Header = (): ReactElement => {

    const { balance } = useAuthContext();

    const { colors } = useThemeContext();

    return (
        <View style={{
            backgroundColor: colors.background,
            paddingHorizontal: 16,
            flexDirection: "row",
            justifyContent: "space-between"
        }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image
                    source={require("../../../assets/pig.png")}
                    resizeMode="contain"
                    style={{ width: 48, height: 48 }}
                />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 16 }}>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8 }}>
                    <Image
                        source={require("../../../assets/valorant-point.png")}
                        resizeMode="contain"
                        style={{ width: 24, height: 24 }}
                    />
                    <Text variant="bodyMedium">{balance.valorantPoint}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8 }}>
                    <Image
                        source={require("../../../assets/radianite-point.png")}
                        resizeMode="contain"
                        style={{ width: 24, height: 24 }}
                    />
                    <Text variant="bodyMedium">{balance.radianitePoint}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8 }}>
                    <Image
                        source={require("../../../assets/kingdom-credit.png")}
                        resizeMode="contain"
                        style={{ width: 24, height: 24 }}
                    />
                    <Text variant="bodyMedium">{balance.kingdomCredit}</Text>
                </View>
            </View>
        </View>
    );
};

export default Header;
