import { ReactElement } from "react";
// context
import { initialThemeState, ThemeContext } from "@/context/theme/theme-context";

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
