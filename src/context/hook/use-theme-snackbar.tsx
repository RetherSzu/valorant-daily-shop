import { useContext } from "react";
// context
import { SnackbarContext } from "@/context/snackbar/snackbar-context";

export const useSnackbarContext = () => {
    const context = useContext(SnackbarContext);

    if (!context) throw new Error("useSnackbarContext context must be use inside SnackbarProvider");

    return context;
};
