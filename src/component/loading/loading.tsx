import { ReactElement } from "react";
import { ActivityIndicator, View } from "react-native";
// context
import { useThemeContext } from "@/context/hook/use-theme-context";

const Loading = (): ReactElement => {

    const { colors } = useThemeContext();

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator color={colors.text} size="large" />
        </View>
    );
};

export default Loading;
