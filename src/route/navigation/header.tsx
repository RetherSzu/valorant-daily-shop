import React, { ReactElement } from "react";
import { Image, View } from "react-native";
// component
import Text from "@/component/typography/text";
// context
import useUserContext from "@/context/hook/use-user-context";
import useThemeContext from "@/context/hook/use-theme-context";
// section
import CostPoint from "@/section/shop/cost-point";

type HeaderProps = {
    leftComponent?: ReactElement;
};

const Header = ({ leftComponent }: HeaderProps): ReactElement => {

    const { balance } = useUserContext();

    const { colors } = useThemeContext();

    const { gameName, tagLine } = useUserContext();

    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                justifyContent: "space-between",
                backgroundColor: colors.background,
                height: 80,
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

            {gameName && tagLine && <Text variant="titleSmall" style={{ opacity: .5 }}>{gameName} #{tagLine}</Text>}

            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 16 }}>
                <CostPoint currencyId="vp" cost={balance.valorantPoint ?? 0} textVariant="bodyMedium" />
                <CostPoint currencyId="rp" cost={balance.radianitePoint ?? 0} textVariant="bodyMedium" />
                <CostPoint currencyId="kc" cost={balance.kingdomCredit ?? 0} textVariant="bodyMedium" />
            </View>
        </View>
    );
};

export default Header;
