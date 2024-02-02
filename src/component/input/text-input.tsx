import React from "react";
import { StyleProp, TextInput as DefaultTextInput, TextStyle, View, ViewStyle } from "react-native";
// context
import { useThemeContext } from "@/context/hook/use-theme-context";

type TextInputProps = {
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
        secureTextEntry = false
    }: TextInputProps) => {

    const { colors } = useThemeContext();

    return (
        <View style={[{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: 56,
            borderRadius: 16,
            backgroundColor: backgroundColor,
            padding: 16,
            gap: 16
        }, style]}>
            {icon ? icon : null}
            <DefaultTextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                style={[{
                    flex: 1,
                    height: 56,
                    color: colors.text
                }, textStyle]}
                placeholderTextColor="#ffffff80"
            />
        </View>
    );
};

export default TextInput;
