import { createContext } from "react";
// type
import { IThemeContext } from "@/type/context/theme";

// ----------------------------------------------------------

export const initialThemeState: IThemeContext = {
    dark: true,
    colors: {
        primary: "rgb(255, 45, 85)",
        background: "#1B1D21",
        card: "rgb(255, 255, 255)",
        text: "#FFFFFF",
        border: "rgb(199, 199, 204)",
        notification: "rgb(255, 69, 58)"
    }
};

// ----------------------------------------------------------

export const ThemeContext = createContext<IThemeContext>(initialThemeState);
