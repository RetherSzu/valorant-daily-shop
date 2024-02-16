import { View } from "react-native";
import { Text } from "react-native-paper";
import { ReactNode } from "react";
import { Iconify } from "react-native-iconify";

type Props = {
    severity: "error" | "warning";
    children: ReactNode;
};

const Alert = ({ severity, children }: Props) => {

    const alertColor = {
        "error": {
            backgroundColor: "rgb(255,48,48)",
            color: "#ffac82"
        },
        "warning": {
            backgroundColor: "rgb(255,191,0)",
            color: "#212b36"
        }
    };

    const alertIcons = {
        "error": <Iconify icon="solar:danger-bold" size={24} color={alertColor[severity].color} />,
        "warning": <Iconify icon="eva:alert-triangle-fill" size={24} color={alertColor[severity].color} />
    };

    return (
        <View
            style={[alertColor[severity], {
                gap: 16,
                padding: 16,
                borderWidth: 1,
                borderRadius: 16,
                flexDirection: "row",
                alignItems: "center"
            }]}
        >
            {alertIcons[severity]}
            <Text style={{ color: alertColor[severity].color }}>{children}</Text>
        </View>
    );
};

export default Alert;
