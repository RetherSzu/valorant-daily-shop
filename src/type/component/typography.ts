import { ReactNode } from "react";
import { StyleSheet, TextProps } from "react-native";

export type TypographyProps = TextProps & {
    variant: "h1" | "h2" | "h3" | "h4" | "subtitle1" | "subtitle2" | "body1" | "body2",
    children: ReactNode
}

export const styles = StyleSheet.create({
    // Headline/H1
    h1: {
        fontFamily: "Inter",
        fontSize: 56,
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: 64
    },
    // Headline/H2
    h2: {
        fontFamily: "Inter",
        fontSize: 48,
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: 56
    },
    // Headline/H3
    h3: {
        fontFamily: "Inter",
        fontSize: 40,
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: 48
    },
    // Headline/H4
    h4: {
        fontFamily: "Inter",
        fontSize: 32,
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: 40
    },
    // Subtitle1
    subtitle1: {
        fontFamily: "Inter",
        fontSize: 12,
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: 20
    },
    // Subtitle2
    subtitle2: {
        fontFamily: "Inter",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "600",
        lineHeight: 16
    },
    // Body1
    body1: {
        fontFamily: "Inter",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: 20
    },
    // Body2
    body2: {
        fontFamily: "Inter",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: 24
    }
});

export type IVariant = {
    fontFamily: string,
    fontSize: number,
    fontStyle: "normal",
    fontWeight: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined,
    lineHeight: number
}

export type IVariantStyles = {
    [key in "h1" | "h2" | "h3" | "h4" | "subtitle1" | "subtitle2" | "body1" | "body2"]: IVariant;
}

export const variantStyles: IVariantStyles = {
    h1: styles.h1,
    h2: styles.h2,
    h3: styles.h3,
    h4: styles.h4,
    body1: styles.body1,
    body2: styles.body2,
    subtitle1: styles.subtitle1,
    subtitle2: styles.subtitle2
};
