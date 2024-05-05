import React, { ReactElement } from "react";
import { TouchableOpacity } from "react-native";
// components
import SvgEye from "@/components/icon/eye";
import SvgEyeSlash from "@/components/icon/eye-slash";
// contexts
import useThemeContext from "@/contexts/hook/use-theme-context";

const EyePasswordButton = (props: { show: boolean, onPress: any }): ReactElement => {

    const { colors } = useThemeContext();

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: 32,
                height: 32,
                borderRadius: 50
            }}
            onPress={props.onPress}
        >
            {props.show ? <SvgEyeSlash color={colors.text} /> : <SvgEye color={colors.text} />}
        </TouchableOpacity>
    );
};

export default EyePasswordButton;
