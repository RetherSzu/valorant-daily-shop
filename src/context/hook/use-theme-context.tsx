import { useContext } from "react";
// context
import { ThemeContext } from "@/context/theme/theme-context";

export const useThemeContext = () => {
    const context = useContext(ThemeContext);

    if (!context) throw new Error("useThemeContext context must be use inside ThemeProvider");

    return context;
};
