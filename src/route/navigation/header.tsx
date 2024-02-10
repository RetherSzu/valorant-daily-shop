import React, { ReactElement } from "react";
import { Image, View } from "react-native";
// context
import { useAuthContext } from "@/context/hook/use-auth-context";
import { useThemeContext } from "@/context/hook/use-theme-context";
// section
import CostPoint from "@/section/shop/cost-point";

const Header = (): ReactElement => {

    const { balance } = useAuthContext();

    const { colors } = useThemeContext();

    return (
        <View
            style={{
                backgroundColor: colors.background,
                paddingHorizontal: 16,
                flexDirection: "row",
                justifyContent: "space-between"
            }}
        >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image
                    source={require("../../../assets/pig.png")}
                    resizeMode="contain"
                    style={{ width: 48, height: 48 }}
                />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 16 }}>
                <CostPoint currencyId="vp" cost={balance.valorantPoint} textVariant="bodyMedium" />
                <CostPoint currencyId="rp" cost={balance.radianitePoint} textVariant="bodyMedium" />
                <CostPoint currencyId="kc" cost={balance.kingdomCredit} textVariant="bodyMedium" />
            </View>
        </View>
    );
};

export default Header;
