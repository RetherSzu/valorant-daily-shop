import React from "react";
import { StyleProp, TextInput as DefaultTextInput, TextStyle, View, ViewStyle } from "react-native";
// context
import useThemeContext from "@/context/hook/use-theme-context";

export type TextInputProps = {
    placeholder?: string,
    value?: string,
    onChangeText: (text: string) => void,
    style?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<TextStyle>,
    icon?: any,
    backgroundColor?: string,
    secureTextEntry?: boolean
}

const TextInput = (
    {
        placeholder,
        value,
        onChangeText,
        style,
        textStyle,
        icon,
        backgroundColor = "#222429",
        secureTextEntry = false,
        ...other
    }: TextInputProps) => {

    const { colors } = useThemeContext();

    return (
        <View
            style={[{
                gap: 16,
                height: 56,
                padding: 16,
                width: "100%",
                borderRadius: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: backgroundColor,
            }, style]}
        >
            {icon ? icon : null}
            <DefaultTextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                style={[{
                    flex: 1,
                    height: 56,
                    color: colors.text,
                }, textStyle]}
                placeholderTextColor="#ffffff80"
                {...other}
            />
        </View>
    );
};

export default TextInput;
