import React, { ReactElement } from "react";
import { Image, View } from "react-native";
// contexts
import useUserContext from "@/contexts/hook/use-user-context";
import useThemeContext from "@/contexts/hook/use-theme-context";
// sections
import CostPoint from "@/sections/shop/cost-point";

type HeaderProps = {
    leftComponent?: ReactElement;
};

const Header = ({ leftComponent }: HeaderProps): ReactElement => {

    const { balance } = useUserContext();

    const { colors } = useThemeContext();

    return (
        <View
            style={{
                height: 64,
                alignItems: "center",
                flexDirection: "row",
                paddingHorizontal: 16,
                justifyContent: "space-between",
                backgroundColor: colors.background,
            }}
        >
            {leftComponent ? leftComponent : (
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Image
                        resizeMode="contain"
                        style={{ width: 48, height: 48 }}
                        source={require("../../../assets/pig.png")}
                    />
                </View>
            )}

            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 16 }}>
                <CostPoint currencyId="vp" cost={balance.valorantPoint ?? 0} textVariant="bodyMedium" />
                <CostPoint currencyId="rp" cost={balance.radianitePoint ?? 0} textVariant="bodyMedium" />
                <CostPoint currencyId="kc" cost={balance.kingdomCredit ?? 0} textVariant="bodyMedium" />
            </View>
        </View>
    );
};

export default Header;
