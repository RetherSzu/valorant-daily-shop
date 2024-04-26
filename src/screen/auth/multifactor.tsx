import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
// auth
import authLogic from "@/auth/auth-logic";
// component
import Text from "@/component/typography/text";
import NumericKeyboard from "@/component/input/numeric-keyboard";
// context
import { useThemeContext } from "@/context/hook/use-theme-context";

const INPUT_COUNT = 6;

const Multifactor = () => {

    const { colors } = useThemeContext();

    const [inputs, setInputs] = useState<string[]>(Array(INPUT_COUNT).fill(""));

    const [loading, setLoading] = useState<boolean>(false);

    const handleNumberPress = (number: string | number) => {
        const updatedInputs = [...inputs];
        if (number === "clear") {
            setInputs(Array(INPUT_COUNT).fill(""));
        } else {
            const nextInputIndex = updatedInputs.indexOf("");
            if (nextInputIndex !== -1) {
                updatedInputs[nextInputIndex] = number.toString();
                setInputs(updatedInputs);
            }
        }
    };

    useEffect(() => {
        if (inputs[inputs.length - 1] !== "") {
            (async () => login())();
        }
    }, [inputs]);

    const login = async () => {
        if (loading) return;
        setLoading(true);
        if (await authLogic.multifactor(inputs.join(""))) {
            const entitlement = await authLogic.getEntitlement();
            if (!entitlement) {
                setLoading(false);
                return;
            }
        }
        setLoading(false);
    };

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "space-around",
                backgroundColor: colors.background,
            }}
        >
            <Text variant="displaySmall">Welcome back!</Text>
            <View style={styles.inputsContainer}>
                {inputs.map((input, index) => (
                    // @ts-ignore
                    <View style={[styles.input, input && { backgroundColor: colors.text }]} key={index} />
                ))}
            </View>
            <NumericKeyboard onNumberPress={handleNumberPress} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0f1923",
        gap: 32,
        padding: 16,
    },
    inputsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 16,
        alignItems: "center",
    },
    input: {
        width: 14,
        height: 14,
        borderRadius: 50,
        backgroundColor: "#494A4D",
    },
    filledInput: {
        backgroundColor: "#fff",
    },
});

export default Multifactor;
