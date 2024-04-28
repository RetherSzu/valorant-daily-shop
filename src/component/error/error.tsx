import { Image, View } from "react-native";
// component
import Text from "@/component/typography/text";
// context
import useThemeContext from "@/context/hook/use-theme-context";

const Error = () => {

    const { colors } = useThemeContext();

    return (
        <View
            style={{
                backgroundColor: colors.card,
                borderRadius: 16,
                padding: 16,
                justifyContent: "center",
                alignItems: "center",
                gap: 16,
            }}
        >
            <Image source={require("../../../assets/error.png")} style={{ width: 50, height: 50 }} />
            <Text variant="titleMedium">Error when trying to get resource</Text>
        </View>
    );
};

export default Error;
