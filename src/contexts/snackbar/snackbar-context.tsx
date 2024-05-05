import { createContext } from "react";
// types
import { ISnackbarContext } from "@/types/context/snackbar";

// ----------------------------------------------------------

export const initialSnackbarState: ISnackbarContext = {
    showSnackbar: (_message: string, _type: "error" | "success" | "info" | "warning"): void => {
    },
};

// ----------------------------------------------------------

export const SnackbarContext = createContext(initialSnackbarState);
