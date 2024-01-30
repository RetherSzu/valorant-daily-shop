import { ReactElement } from "react";
// context
import { ThemeProvider } from "@/context/theme/theme-provider";
import Router from "@/route/index";

export default function App(): ReactElement {

    return (
        <ThemeProvider>
            <Router />
        </ThemeProvider>
    );
}
