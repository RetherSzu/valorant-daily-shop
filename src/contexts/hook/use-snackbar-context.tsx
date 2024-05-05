import { useContext } from "react";
// contexts
import { SnackbarContext } from "@/contexts/snackbar/snackbar-context";

const useSnackbarContext = () => {
    const context = useContext(SnackbarContext);

    if (!context) throw new Error("useSnackbarContext context must be use inside SnackbarProvider");

    return context;
};

export default useSnackbarContext;
