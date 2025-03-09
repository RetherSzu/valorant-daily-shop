import { TouchableRipple } from "react-native-paper";
import React, { ReactElement, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
// components
import Text from "@/components/typography/text";
import Button from "@/components/button/button";
import SvgLogout from "@/components/icon/logout";
// contexts
import useThemeContext from "@/contexts/hook/use-theme-context";
// types
import { IUserData } from "@/types/context/user";
// utils
import { getLevelBorder } from "@/utils/level-border";
import { getCompetitiveTierIcon } from "@/utils/competitive-tier-icon";

const UserItem = ({ index, user, handleLogin, handleLogout, handleRelogin }: {
    index: number,
    user: IUserData,
    handleLogin: () => Promise<void>,
    handleLogout: () => void,
    handleRelogin: () => void,
}): ReactElement => {

    const { colors } = useThemeContext();
    const [loading, setLoading] = useState(false);

    const login = async () => {
        setLoading(true);
        try {
            await handleLogin();
        } catch (error) {
            handleRelogin();
            console.log(error);
        }
        setLoading(false);
    };

    return (
        <View key={index} style={[{ backgroundColor: colors.card }, styles.userContainer]}>
            <View style={styles.innerContainer}>
                <View style={styles.playerInfoContainer}>
                    <View style={styles.levelContainer}>
                        <View style={styles.levelTextContainer}>
                            <Text style={styles.levelText}>{user["level"]}</Text>
                        </View>
                        <Image
                            style={styles.levelImage}
                            source={getLevelBorder(parseInt(user["level"] ?? "1")).levelNumberAppearance}
                        />
                    </View>
                    <Image
                        style={styles.playerCardImage}
                        source={{ uri: `https://media.valorant-api.com/playercards/${user["player_card_id"]}/smallart.png` }}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.infoContainer}>
                    <Text variant="headlineSmall">
                        {user["game_name"]} #{user["tag_line"]}
                    </Text>
                    <View style={styles.rankContainer}>
                        <Image
                            style={styles.rankImage}
                            source={getCompetitiveTierIcon(user["rank"] ?? "iron")}
                            resizeMode="contain"
                        />
                        <Text style={styles.rankText} variant="titleMedium">
                            {user["rank"]} - {user["rr"]} RR
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: "row", gap: 16 }}>
                <Button
                    text="Select"
                    onPress={login}
                    loading={loading}
                    underlayColor="#222429"
                    backgroundColor={colors.primary}
                />
                <TouchableRipple
                    style={{ padding: 16, backgroundColor: colors.background, borderRadius: 16 }}
                    onPress={handleLogout}
                    borderless
                    rippleColor="rgba(255, 70, 86, .20)"
                >
                    <SvgLogout color={colors.primary} />
                </TouchableRipple>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    userContainer: {
        gap: 16,
        padding: 16,
        paddingTop: 24,
        borderRadius: 16,
    },
    innerContainer: {
        width: "100%",
        alignItems: "center",
        borderRadius: 32,
        flexDirection: "row",
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
});

export default React.memo(UserItem);