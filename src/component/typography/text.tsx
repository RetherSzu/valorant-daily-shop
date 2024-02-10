import { ReactElement } from "react";
import { StyleProp, TextStyle } from "react-native";
import { Text as TextPaper, TextProps } from "react-native-paper";
// context
import { useThemeContext } from "@/context/hook/use-theme-context";

const Text = ({ children, style, ...props }: TextProps<string>): ReactElement => {

    const { colors } = useThemeContext();

    let customStyle: StyleProp<TextStyle> = { color: colors.text };

    if (style) customStyle = [customStyle, style];

    return (
        <TextPaper {...props} style={customStyle}>
            {children}
        </TextPaper>
    );
};

export default Text;
