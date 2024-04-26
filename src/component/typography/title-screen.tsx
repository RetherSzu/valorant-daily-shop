import { View } from "react-native";
// component
import Text from "@/component/typography/text";
// context
import { useThemeContext } from "@/context/hook/use-theme-context";

type Props = {
    name: string
};

const TitleScreen = ({ name = "" }: Props) => {

    const { colors } = useThemeContext();

    return (
        <View
            style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                gap: 16
            }}
        >
            <View style={{
                width: 0,
                height: 0,
                backgroundColor: "transparent",
                borderStyle: "solid",
                borderTopWidth: 0,
                borderRightWidth: 8,
                borderBottomWidth: 14,
                borderLeftWidth: 8,
                borderTopColor: "transparent",
                borderRightColor: "transparent",
                borderBottomColor: colors.text,
                borderLeftColor: "transparent",
                transform: [{ rotate: "-90deg" }]
            }} />
            <Text
                variant="displaySmall"
                style={{
                    fontFamily: "DrukWide"
                }}
            >
                {name}
            </Text>
        </View>
    );
};

export default TitleScreen;
