import React from "react";
import { ActivityIndicator, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
// components
import Text from "@/components/typography/text";
// contexts
import useThemeContext from "@/contexts/hook/use-theme-context";
import { TouchableRipple } from "react-native-paper";

type ButtonProps = {
    text?: string;
    icon?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    loading?: boolean;
    onPress?: VoidFunction;
    disabled?: boolean;
    textStyle?: StyleProp<TextStyle>;
    rippleColor?: string;
    onLongPress?: VoidFunction;
    underlayColor?: string;
    backgroundColor?: string;
}

const Button: React.FC<ButtonProps> = ({
    text,
    icon,
    style,
    loading = false,
    onPress,
    disabled = false,
    textStyle,
    rippleColor = "rgba(0, 0, 0, .32)",
    onLongPress,
    underlayColor = "#FF465680",
    backgroundColor,
}) => {
    const { colors } = useThemeContext();

    return (
        <TouchableRipple
            style={[
                styles.button,
                { backgroundColor, opacity: disabled ? 0.5 : 1 },
                style,
            ]}
            borderless
            onPress={onPress}
            disabled={disabled}
            rippleColor={rippleColor}
            onLongPress={onLongPress}
            underlayColor={underlayColor}
        >
            <View style={styles.content}>
                {icon}
                {loading ? (
                    <ActivityIndicator color={colors.text} />
                ) : text !== undefined && (
                    <Text style={[styles.text, textStyle]} allowFontScaling>
                        {text}
                    </Text>
                )}
            </View>
        </TouchableRipple>
    );
};

const styles = StyleSheet.create({
    button: {
        flex: 1,
        padding: 16,
        maxHeight: 56,
        borderRadius: 16,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        flex: 1,
        fontSize: 16,
        marginLeft: 8,
        fontWeight: "600",
        textAlign: "center",
    },
});

export default Button;
