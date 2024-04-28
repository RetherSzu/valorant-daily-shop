import React from "react";
import { ActivityIndicator, StyleProp, TextStyle, TouchableHighlight, ViewStyle } from "react-native";
// component
import Text from "@/component/typography/text";
// context
import useThemeContext from "@/context/hook/use-theme-context";

type ButtonProps = {
    text: string,
    onPress?: any,
    onLongPress?: any,
    style?: StyleProp<ViewStyle>,
    icon?: any,
    backgroundColor?: string,
    underlayColor?: string,
    textStyle?: StyleProp<TextStyle>,
    loading?: boolean
}

const Button = (
    {
        text,
        onPress,
        onLongPress,
        style,
        icon,
        backgroundColor,
        textStyle,
        underlayColor = "#FF465680",
        loading = false
    }: ButtonProps) => {

    const { colors } = useThemeContext();

    return (
        <TouchableHighlight
            style={[{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                height: 56,
                borderRadius: 16,
                backgroundColor: backgroundColor,
                padding: 16,
                gap: 16
            }, style]}
            underlayColor={underlayColor}
            onPress={onPress}
            onLongPress={onLongPress}
            activeOpacity={0.5}
        >
            <>
                {icon ? icon : null}
                {
                    loading ? <ActivityIndicator color={colors.text} /> :
                        <Text
                            style={[{
                                fontSize: 16,
                                fontWeight: "600",
                                textAlign: "center",
                                flex: 1
                            }, textStyle]}
                            allowFontScaling
                        >
                            {text}
                        </Text>
                }
            </>
        </TouchableHighlight>
    );
};

export default Button;
