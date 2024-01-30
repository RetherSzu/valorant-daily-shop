import { ReactElement } from "react";
// context
import { initialThemeState, ThemeContext } from "@/context/theme/theme-context";

type Props = {
    children: ReactElement
}

export const ThemeProvider = ({ children }: Props) => {
    return (
        <ThemeContext.Provider value={initialThemeState}>
            {children}
        </ThemeContext.Provider>
    );
};
