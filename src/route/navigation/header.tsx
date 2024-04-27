import React, { ReactElement } from "react";
import { Image, View } from "react-native";
import * as SecureStore from "expo-secure-store";
// context
import { useAuthContext } from "@/context/hook/use-auth-context";
import { useThemeContext } from "@/context/hook/use-theme-context";
// section
import CostPoint from "@/section/shop/cost-point";
import Text from "@/component/typography/text";

type HeaderProps = {
    leftComponent?: ReactElement;
};

const Header = ({ leftComponent }: HeaderProps): ReactElement => {

    const { balance } = useAuthContext();

    const { colors } = useThemeContext();

    const gameName = SecureStore.getItem("game_name");
    const tagLine = SecureStore.getItem("tag_line");

    return (
        <View
            style={{
                backgroundColor: colors.background,
                paddingHorizontal: 16,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            {leftComponent ? leftComponent : (
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Image
                        source={require("../../../assets/pig.png")}
                        resizeMode="contain"
                        style={{ width: 48, height: 48 }}
                    />
                </View>
            )}
            {gameName && tagLine && <Text variant="titleSmall" style={{ opacity: .5 }}>{gameName}#{tagLine}</Text>}
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 16 }}>
                <CostPoint currencyId="vp" cost={balance.valorantPoint} textVariant="bodyMedium" />
                <CostPoint currencyId="rp" cost={balance.radianitePoint} textVariant="bodyMedium" />
                <CostPoint currencyId="kc" cost={balance.kingdomCredit} textVariant="bodyMedium" />
            </View>
        </View>
    );
};

export default Header;
