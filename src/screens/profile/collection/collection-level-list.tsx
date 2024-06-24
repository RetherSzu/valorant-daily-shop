import React from "react";
import { TouchableRipple } from "react-native-paper";
import { FlatList, StyleSheet, View } from "react-native";
// components
import SvgLock from "@/components/icon/lock";
import SvgCheck from "@/components/icon/check";
import Text from "@/components/typography/text";
// contexts
import useThemeContext from "@/contexts/hook/use-theme-context";
import useProfileContext from "@/contexts/hook/use-profile-context";
// types
import { PlayerLoadoutGun } from "@/types/api/player-loadout";
import { WeaponLevel, WeaponSkin } from "@/types/api/shop/weapon-skin";
// utils
import { addSpaceBeforeUpperCase } from "@/utils/format-string";

type Props = {
    skin: WeaponSkin;
    currentSkin: WeaponSkin;
    currentLevelIndex?: number;
    playerLoadoutGun: PlayerLoadoutGun;
    handleLevelPress: (index: number, streamedVideo: string) => void;
};

const CollectionLevelList: React.FC<Props> = ({ skin, currentSkin, currentLevelIndex, playerLoadoutGun, handleLevelPress }) => {

    const { colors } = useThemeContext();

    const { skins } = useProfileContext();

    const renderLevelItem = ({ item, index }: { item: WeaponLevel, index: number }) => {
        const isCurrentLevel = index === currentLevelIndex;
        const isLocked = !skins?.Entitlements.some(entitlement => entitlement.ItemID === item.uuid);

        let levelIndex = -1;
        if (currentSkin.uuid === skin.uuid) {
            levelIndex = currentSkin.levels.findIndex(level => level.uuid === playerLoadoutGun.SkinLevelID);
        }

        return (
            <TouchableRipple
                borderless
                key={item.uuid}
                rippleColor={colors.primary}
                onPress={() => handleLevelPress(index, item.streamedVideo)}
                style={[
                    styles.levelItem,
                    { backgroundColor: isCurrentLevel ? `${colors.primary}8C` : "#222429" },
                ]}
            >
                <>
                    <Text variant="headlineSmall">Level {index + 1}</Text>
                    {item.levelItem && (
                        <Text variant="bodyLarge" style={styles.levelText}>
                            {addSpaceBeforeUpperCase(item.levelItem.split("::")[1])}
                        </Text>
                    )}
                    {isLocked && (
                        <View style={styles.checkOverlay}>
                            <SvgLock color="white" width={32} height={32} />
                        </View>
                    )}
                    {levelIndex >= index && (
                        <View style={styles.checkOverlay}>
                            <SvgCheck color="white" width={32} height={32} />
                        </View>
                    )}
                </>
            </TouchableRipple>
        );
    };

    return (
        <FlatList
            overScrollMode="never"
            style={styles.flatList}
            data={currentSkin.levels}
            renderItem={renderLevelItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.uuid}
            contentContainerStyle={styles.flatListContent}
        />
    );
};

const styles = StyleSheet.create({
    flatList: {
        flex: 1,
    },
    flatListContent: {
        gap: 8,
        paddingBottom: 16,
    },
    levelItem: {
        padding: 16,
        borderRadius: 16,
        position: "relative",
    },
    levelText: {
        opacity: 0.5,
    },
    checkOverlay: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "flex-end",
        justifyContent: "center",
        padding: 16,
        backgroundColor: "rgba(34, 36, 41, .2)",
    },
});

export default React.memo(CollectionLevelList);
