import React, { ReactElement } from "react";
import { TouchableOpacity } from "react-native";
// component
import SvgEye from "@/component/icon/eye";
import SvgEyeSlash from "@/component/icon/eye-slash";
// context
import useThemeContext from "@/context/hook/use-theme-context";

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
