import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableRipple } from "react-native-paper";
// components
import Text from "@/components/typography/text";
// contexts
import useThemeContext from "@/contexts/hook/use-theme-context";

type Props = {
    onNumberPress: (number: string | number) => void;
};

const NumericKeyboard = ({ onNumberPress }: Props) => {

    const { colors } = useThemeContext();

    const textStyle = { fontSize: 24 };

    const renderButtons = (numbers: (string | number)[]) => (
        <View style={{
            flexDirection: "row",
            gap: 8,
        }}>
            {numbers.map((number) => (
                <View style={{ borderRadius: 50 }} key={number}>
                    <TouchableRipple
                        key={number}
                        style={styles.button}
                        rippleColor={`${colors.primary}8C`}
                        onPress={() => onNumberPress(number)}
                        borderless
                    >
                        <Text style={textStyle}>{number.toString()}</Text>
                    </TouchableRipple>
                </View>
            ))}
        </View>
    );

    return (
        <View style={styles.numericKeyboard}>
            {renderButtons([1, 2, 3])}
            {renderButtons([4, 5, 6])}
            {renderButtons([7, 8, 9])}
            {renderButtons([0, "clear"])}
        </View>
    );
};

const styles = StyleSheet.create({
    numericKeyboard: {
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        height: 80,
        borderRadius: 50,
    },
});

export default NumericKeyboard;