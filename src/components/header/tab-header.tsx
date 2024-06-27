import React from "react";
import { StyleSheet, View } from "react-native";
// components
import Text from "@/components/typography/text";
// contexts
import useUserContext from "@/contexts/hook/use-user-context";

type Props = {
    title: string;
};

const TabHeader = ({ title }: Props) => {
    const { gameName, tagLine } = useUserContext();

    return (
        <View style={styles.header}>
            <Text variant="displayMedium" style={styles.displayText}>{title}</Text>
            {gameName && tagLine && (
                <Text variant="titleSmall" style={styles.userInfo}>
                    {gameName} #{tagLine}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 16,
        justifyContent: "space-between",
    },
    displayText: {
        fontFamily: "Vandchrome",
        textTransform: "uppercase",
    },
    userInfo: {
        opacity: 0.5,
    },
});

export default React.memo(TabHeader);
