import { MotiView } from "moti";
import * as SecureStore from "expo-secure-store";
import { Image, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
// api
import valorantProvider from "@/api/valorant-provider";
// components
import Button from "@/components/button/button";
import Text from "@/components/typography/text";
import DarkSkeleton from "@/components/skeleton/dark-skeleton";
// contexts
import useUserContext from "@/contexts/hook/use-user-context";
import useThemeContext from "@/contexts/hook/use-theme-context";
// types
import { LevelBorder } from "@/types/api/level-border";
import { NavigationProp } from "@/types/router/navigation";
import { PlayerLoadoutResponse } from "@/types/api/player-loadout";
// utils
import { getLevelBorder } from "@/utils/level-border";
import { getCompetitiveTierIcon } from "@/utils/competitive-tier-icon";

const NameSkeleton = React.memo(() => (
    // @ts-ignore
    <MotiView transition={{ type: "timing" }} style={styles.nameSkeleton}>
        <DarkSkeleton width={70} height={32} radius={8} />
        <Text variant="headlineSmall">#</Text>
        <DarkSkeleton width={50} height={32} radius={8} />
    </MotiView>
));

const RankSkeleton = React.memo(() => (
    // @ts-ignore
    <MotiView transition={{ type: "timing" }} style={styles.rankSkeleton}>
        <DarkSkeleton width={125} height={10} radius={8} />
    </MotiView>
));

const Settings = (): ReactElement => {

    const { gameName, tagLine } = useUserContext();

    const { colors } = useThemeContext();

    const [rank, setRank] = useState<string>();

    const [rr, setRR] = useState<number>();

    const navigate = useNavigation<NavigationProp>();

    const [levelBorder, setLevelBorder] = useState<LevelBorder>({
        displayName: "Level 1 Border",
        startingLevel: 1,
        levelNumberAppearance: require("../../assets/level-borders/level-1-border.png"),
        smallPlayerCardAppearance: require("../../assets/level-borders/level-1-border-card.png"),
    });

    const [accountLevel, setAccountLevel] = useState(1);

    const [playerLoadout, setPlayerLoadout] = useState<PlayerLoadoutResponse | null>(null);

    const handleLogout = useCallback(() => navigate.navigate("Logout"), [navigate]);

    const getUserData = async () => {
        const [playerLoadout, accountXP] = await Promise.all([
            valorantProvider.getPlayerLoadout(),
            valorantProvider.getAccountXP(),
        ]);
        setPlayerLoadout(playerLoadout);
        const level = accountXP.Progress.Level;
        setLevelBorder(getLevelBorder(level));
        setAccountLevel(level);
    };

    const fetchSecureStoreData = async () => {
        const storedLevel = await SecureStore.getItemAsync("account_xp");
        const userLevel = parseInt(storedLevel ?? "1");
        setLevelBorder(getLevelBorder(userLevel));
    };

    const fetchRankData = async () => {
        const { rank, rr } = await valorantProvider.getRank();
        setRank(rank);
        setRR(rr);
    };

    useEffect(() => {
        fetchSecureStoreData();
        getUserData();
        fetchRankData();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Text variant="displayMedium" style={styles.title}>SETTING</Text>
            </View>
            <View style={styles.buttonContainer}>
                <View style={[styles.innerContainer, { backgroundColor: colors.card }]}>
                    <View style={styles.playerInfoContainer}>
                        <View style={styles.levelContainer}>
                            <View style={styles.levelTextContainer}>
                                <Text style={styles.levelText}>{accountLevel}</Text>
                            </View>
                            {levelBorder && (
                                <Image source={levelBorder.levelNumberAppearance} style={styles.levelImage} />
                            )}
                        </View>
                        {playerLoadout ? (
                            <Image
                                resizeMode="contain"
                                style={styles.playerCardImage}
                                source={{ uri: `https://media.valorant-api.com/playercards/${playerLoadout.Identity.PlayerCardID}/smallart.png` }}
                            />
                        ) : (
                            // @ts-ignore
                            <MotiView transition={{ type: "timing" }}>
                                <DarkSkeleton width={128} height={128} radius={16} />
                            </MotiView>
                        )}
                    </View>
                    <View style={styles.infoContainer}>
                        {gameName && tagLine ? (
                            <Text variant="headlineSmall">
                                {gameName} #{tagLine}
                            </Text>
                        ) : (
                            <NameSkeleton />
                        )}
                        {rank && rr ? (
                            <View style={styles.rankContainer}>
                                <Image
                                    resizeMode="contain"
                                    style={styles.rankImage}
                                    source={getCompetitiveTierIcon(rank)}
                                />
                                <Text style={styles.rankText} variant="titleMedium">
                                    {rank} - {rr} RR
                                </Text>
                            </View>
                        ) : (
                            <RankSkeleton />
                        )}
                    </View>
                </View>
                <Button
                    text="Logout"
                    onPress={handleLogout}
                    backgroundColor={colors.primary}
                    underlayColor="#222429"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
    },
    buttonContainer: {
        gap: 16,
        flex: 1,
        padding: 16,
        width: "100%",
        borderRadius: 32,
        alignItems: "center",
        justifyContent: "space-between",
    },
    innerContainer: {
        padding: 16,
        width: "100%",
        paddingTop: 24,
        borderRadius: 32,
        flexDirection: "row",
    },
    playerInfoContainer: {
        position: "relative",
        width: 128,
    },
    levelContainer: {
        position: "absolute",
        zIndex: 1,
        left: 0,
        right: 0,
        top: -16,
        alignItems: "center",
        justifyContent: "center",
    },
    levelTextContainer: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
    },
    levelText: {
        zIndex: 1,
        textAlign: "center",
    },
    levelImage: {
        width: 76,
        height: 32,
    },
    playerCardImage: {
        width: 128,
        height: 128,
        borderRadius: 16,
    },
    infoContainer: {
        padding: 16,
        gap: 8,
    },
    rankContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
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
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    rankSkeleton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
    },
});

export default React.memo(Settings);
