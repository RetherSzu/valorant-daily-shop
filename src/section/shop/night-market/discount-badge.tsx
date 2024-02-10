import { View } from "react-native";
import { ReactElement } from "react";
// component
import Text from "@/component/typography/text";
// context
import { useThemeContext } from "@/context/hook/use-theme-context";

type Props = {
    discount: number;
}

const DiscountBadge = ({ discount }: Props): ReactElement => {

    const { colors } = useThemeContext();


    return (
        <View
            style={{
                position: "absolute",
                right: 0,
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "transparent",
            }}
        >
            <View
                style={{
                    position: "absolute",
                    right: -1,
                    width: 0,
                    height: 0,
                    borderStyle: "solid",
                    borderTopWidth: 100,
                    borderLeftWidth: 100,
                    borderRightWidth: 0,
                    borderBottomWidth: 0,
                    borderLeftColor: "transparent",
                    borderTopColor: "rgba(0, 0, 0, .5)",
                }}
            />
            <Text variant="titleMedium" style={{ color: colors.primary, opacity: 1 }} numberOfLines={1}>
                -{discount}%
            </Text>
        </View>
    )
}

export default DiscountBadge;
