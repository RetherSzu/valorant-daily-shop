import React, { ReactElement } from "react";
import { Image, View } from "react-native";
// component
import Typography from "@/component/typography/typography";
// context
import { useAuthContext } from "@/context/hook/use-auth-context";

const Header = (): ReactElement => {

    const { balance } = useAuthContext();

    return (
        <View style={{ flexDirection: "row", gap: 16 }}>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8 }}>
                <Typography variant="body2">{balance.valorantPoint}</Typography>
                <Image
                    source={require("../../../assets/valorant-point.png")}
                    resizeMode="contain"
                    style={{ width: 24, height: 24 }}
                />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8 }}>
                <Typography variant="body2">{balance.radianitePoint}</Typography>
                <Image
                    source={require("../../../assets/radianite-point.png")}
                    resizeMode="contain"
                    style={{ width: 24, height: 24 }}
                />
            </View>
        </View>
    );
};

export default Header;
