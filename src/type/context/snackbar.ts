export type ISnackbarContext = {
    showSnackbar: (message: string, type: "error" | "success" | "info" | "warning") => void;
}

export type SnackbarState = {
    message: string;
    type: "error" | "success" | "info" | "warning";
    visible: boolean;
}
