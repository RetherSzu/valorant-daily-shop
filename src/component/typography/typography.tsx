import { Text } from "react-native";
// context
import { useThemeContext } from "@/context/hook/use-theme-context";
// type
import { IVariant, styles, TypographyProps, variantStyles } from "@/type/component/typography";

const Typography = ({ variant = "body1", style, children, ...props }: TypographyProps) => {

    const { colors } = useThemeContext();

    let textStyle: IVariant = styles.body1; // default style

    if (variantStyles[variant]) {
        textStyle = variantStyles[variant];
    }

    return (
        <Text style={[{ color: colors.text }, textStyle, style]} {...props}>
            {children}
        </Text>
    );
};

export default Typography;
