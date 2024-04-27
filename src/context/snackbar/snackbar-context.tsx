import { createContext } from "react";
// type
import { ISnackbarContext } from "@/type/context/snackbar";

// ----------------------------------------------------------

export const initialSnackbarState: ISnackbarContext = {
    showSnackbar: (_message: string, _type: "error" | "success" | "info" | "warning"): void => {
    },
};

// ----------------------------------------------------------

export const SnackbarContext = createContext(initialSnackbarState);
