import React from "react";
import { Iconify } from "react-native-iconify";
import { StyleSheet, Text, View } from "react-native";

type SnackbarProps = {
    message: string;
    type: "error" | "success" | "info" | "warning";
    visible: boolean;
};

const alertColor = {
    error: {
        backgroundColor: "#B71D18",
        color: "#ffffff",
    },
    success: {
        backgroundColor: "#4CAF50",
        color: "#ffffff",
    },
    info: {
        backgroundColor: "#2196F3",
        color: "#ffffff",
    },
    warning: {
        backgroundColor: "#FFBF00",
        color: "#212b36",
    },
};

const ErrorIcon = () => <Iconify icon="solar:danger-bold" size={24} color="#ffffff" />;
const SuccessIcon = () => <Iconify icon="eva:checkmark-circle-2-fill" size={24} color="#ffffff" />;
const InfoIcon = () => <Iconify icon="eva:info-outline" size={24} color="#ffffff" />;
const WarningIcon = () => <Iconify icon="eva:alert-triangle-fill" size={24} color="#212b36" />;


const Snackbar = ({ message, type, visible }: SnackbarProps) => {
    if (!visible) return null;

    const Icon = {
        error: ErrorIcon,
        success: SuccessIcon,
        info: InfoIcon,
        warning: WarningIcon,
    }[type];

    return (
        <View style={[styles.container, alertColor[type]]}>
            <Icon />
            <Text style={{ color: alertColor[type].color, marginLeft: 16 }}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 16,
        right: 16,
        left: 16,
        padding: 16,
        borderWidth: 1,
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
    },
});

export default Snackbar;
