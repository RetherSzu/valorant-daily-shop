import { createContext } from "react";
// type
import { IThemeContext } from "@/type/context/theme";

// ----------------------------------------------------------

export const initialThemeState: IThemeContext = {
    dark: true,
    colors: {
        primary: "#DC3D4B",
        background: "#1B1D21",
        card: "#222429",
        text: "#FFFFFF",
        border: "#222429",
        notification: "rgb(255, 69, 58)"
    }
};

// ----------------------------------------------------------

export const ThemeContext = createContext<IThemeContext>(initialThemeState);
