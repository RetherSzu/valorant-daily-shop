import { Text as TextPaper, TextProps } from "react-native-paper";
// context
import { useThemeContext } from "@/context/hook/use-theme-context";

const Text = ({ children, style, ...props }: TextProps<string>) => {

    const { colors } = useThemeContext();

    let customStyle = { color: colors.text };

    if (style && Array.isArray(style) && style[0]) {
        // @ts-ignore
        customStyle = { ...customStyle, ...style[0] };
    }

    return (
        <TextPaper {...props} style={customStyle}>
            {children}
        </TextPaper>
    );
};

export default Text;
