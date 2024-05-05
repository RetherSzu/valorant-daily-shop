import { ReactElement } from "react";
import { ActivityIndicator, View } from "react-native";
// contexts
import useThemeContext from "@/contexts/hook/use-theme-context";

const Loading = (): ReactElement => {

    const { colors } = useThemeContext();

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background }}>
            <ActivityIndicator color={colors.text} size="large" />
        </View>
    );
};

export default Loading;
