import React from "react";
import { TouchableRipple } from "react-native-paper";
import { Image, StyleSheet, View } from "react-native";
// components
import SvgLock from "@/components/icon/lock";
import SvgCheck from "@/components/icon/check";
// contexts
import useThemeContext from "@/contexts/hook/use-theme-context";

type Props = {
    index: number;
    owned: boolean;
    agentIndex: number;
    displayIcon: string;
    onPress: () => void;
}

const AgentCard = ({ index, owned, agentIndex, displayIcon, onPress }: Props) => {

    const { colors } = useThemeContext();

    return (
        <TouchableRipple
            borderless
            key={index}
            onPress={onPress}
            style={[
                styles.touchable,
                {
                    backgroundColor: colors.card,
                    borderColor: agentIndex === index ? colors.primary : colors.card,
                },
            ]}
            rippleColor="rgba(255, 70, 86, .20)"
        >
            <>
                {owned ? (
                    <View style={styles.checkOverlay}>
                        <SvgCheck color="white" width={32} height={32} opacity={0.8} />
                    </View>
                ) : (
                    <View style={styles.lockOverlay}>
                        <SvgLock color="white" width={32} height={32} />
                    </View>
                )}
                <Image source={{ uri: displayIcon }} style={styles.agentImage} />
            </>
        </TouchableRipple>
    );
};

const styles = StyleSheet.create({
    touchable: {
        gap: 4,
        borderWidth: 2,
        borderRadius: 8,
        position: "relative",
    },
    checkOverlay: {
        zIndex: 10,
        position: "absolute",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(34, 36, 41, .2)",
    },
    lockOverlay: {
        zIndex: 10,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(34, 36, 41, .5)",
    },
    agentImage: {
        width: 96,
        height: 96,
    },
});

export default React.memo(AgentCard);
