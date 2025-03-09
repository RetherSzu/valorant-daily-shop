import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { ReactElement, useCallback } from "react";
// components
import Text from "@/components/typography/text";
import Button from "@/components/button/button";
// contexts
import useAuthContext from "@/contexts/hook/use-auth-context";
import useThemeContext from "@/contexts/hook/use-theme-context";
// types
import { EAuthContextType } from "@/types/context/auth";
import { NavigationProp } from "@/types/router/navigation";

const Settings = (): ReactElement => {

    const { colors } = useThemeContext();

    const { dispatch } = useAuthContext();

    const navigate = useNavigation<NavigationProp>();

    const handleLogin = useCallback(async () => {
        await AsyncStorage.removeItem("current_user");
        dispatch({
            type: EAuthContextType.INITIAL,
            payload: {
                currentUser: null,
            },
        });
    }, [dispatch, navigate]);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Text variant="displayMedium" style={styles.title}>SETTING</Text>
            </View>
            <View style={styles.listContainer}>
                <View style={styles.buttonContainer}>
                    <Button
                        icon={<Text>+</Text>}
                        text="Add Account"
                        onPress={handleLogin}
                        underlayColor="#222429"
                        backgroundColor={colors.primary}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 16,
    },
    listContainer: {
        flex: 1,
    },
    buttonContainer: {
        gap: 16,
        flex: 1,
        width: "100%",
        padding: 16,
        maxHeight: 88,
        alignItems: "center",
        borderRadius: 32,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    innerContainer: {
        width: "100%",
        padding: 16,
        paddingTop: 24,
        alignItems: "center",
        borderRadius: 32,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    playerInfoContainer: {
        width: 96,
        position: "relative",
    },
    levelContainer: {
        top: -12,
        left: 0,
        right: 0,
        zIndex: 1,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
    levelTextContainer: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
    levelText: {
        zIndex: 1,
        textAlign: "center",
    },
    levelImage: {
        width: 57,
        height: 24,
    },
    playerCardImage: {
        width: 96,
        height: 96,
        borderRadius: 16,
    },
    infoContainer: {
        gap: 8,
        padding: 16,
    },
    rankContainer: {
        gap: 8,
        alignItems: "center",
        flexDirection: "row",
    },
    rankImage: {
        height: 32,
        width: 32,
    },
    rankText: {
        opacity: 0.5,
    },
    title: {
        fontFamily: "Vandchrome",
    },
    nameSkeleton: {
        gap: 8,
        alignItems: "center",
        flexDirection: "row",
    },
    rankSkeleton: {
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 16,
    },
});

export default React.memo(Settings);
