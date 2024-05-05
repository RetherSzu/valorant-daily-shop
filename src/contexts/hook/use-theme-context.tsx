import { useContext } from "react";
// contexts
import { ThemeContext } from "@/contexts/theme/theme-context";

const useThemeContext = () => {
    const context = useContext(ThemeContext);

    if (!context) throw new Error("useThemeContext context must be use inside ThemeProvider");

    return context;
};

export default useThemeContext;
