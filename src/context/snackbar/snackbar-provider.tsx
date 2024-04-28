import React, { useState } from "react";
// component
import Snackbar from "@/component/snackbar";
// context
import { SnackbarContext } from "@/context/snackbar/snackbar-context";
import { SnackbarState } from "@/type/context/snackbar";

type SnackbarProviderProps = {
    children: React.ReactNode;
};

const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
    const [snackbar, setSnackbar] = useState<SnackbarState>({
        message: "",
        type: "info",
        visible: false,
    });

    const showSnackbar = (message: string, type: "error" | "success" | "info" | "warning") => {
        setSnackbar({ visible: true, message, type });
        setTimeout(() => setSnackbar({ visible: false, message: "", type: "info" }), 3000);
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <Snackbar message={snackbar.message} type={snackbar.type} visible={snackbar.visible} />
        </SnackbarContext.Provider>
    );
};

export default SnackbarProvider;
