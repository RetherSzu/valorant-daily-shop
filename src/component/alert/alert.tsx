import { ReactNode } from "react";
import { View } from "react-native";
import { Iconify } from "react-native-iconify";
// component
import Text from "@/component/typography/text";

type Props = {
    severity: "error" | "warning";
    children: ReactNode;
};

const Alert = ({ severity, children }: Props) => {

    const alertColor = {
        "error": {
            backgroundColor: "#B71D18",
            color: "#ffffff"
        },
        "warning": {
            backgroundColor: "#FFBF00",
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
