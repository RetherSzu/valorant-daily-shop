import { ReactElement } from "react";
// contexts
import { initialThemeState, ThemeContext } from "@/contexts/theme/theme-context";

type Props = {
    children: ReactElement
}

const ThemeProvider = ({ children }: Props) => {
    return (
        <ThemeContext.Provider value={initialThemeState}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
