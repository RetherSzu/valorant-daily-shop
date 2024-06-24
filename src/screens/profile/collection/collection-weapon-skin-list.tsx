import React from "react";
import { TouchableRipple } from "react-native-paper";
import { FlatList, Image, StyleSheet, View } from "react-native";
// api
import { Response } from "@/api/rtk-valorant-api";
// components
import SvgLock from "@/components/icon/lock";
import SvgCheck from "@/components/icon/check";
// contexts
import useThemeContext from "@/contexts/hook/use-theme-context";
// types
import { Weapon } from "@/types/api/shop/weapon";
import { EntitlementByType } from "@/types/api/owned-items";
import { WeaponSkin, WeaponSkins } from "@/types/api/shop/weapon-skin";

type Props = {
    skin: WeaponSkin;
    currentSkin: WeaponSkin;
    sortedSkins: WeaponSkins;
    skins?: EntitlementByType;
    weaponData?: Response<Weapon>;
    onCardPress: (skin: WeaponSkin) => void;
};

const CollectionWeaponSkinList: React.FC<Props> = ({
    skin,
    skins,
    weaponData,
    sortedSkins,
    currentSkin,
    onCardPress,
}) => {
    const { colors } = useThemeContext();

    const renderItem = ({ item }: { item: WeaponSkin }) => {
        const isCurrentSkin = currentSkin.uuid === item.uuid;
        const isLocked = item.themeUuid !== "0d7a5bfb-4850-098e-1821-d989bbfd58a8" &&
            item.uuid !== weaponData?.data.defaultSkinUuid &&
            !skins?.Entitlements.some((entitlement) =>
                item.levels.some((level) => level.uuid === entitlement.ItemID),
            );

        return (
            <TouchableRipple
                borderless
                onPress={() => onCardPress(item)}
                rippleColor="rgba(255, 70, 86, .20)"
                style={[
                    styles.card,
                    {
                        backgroundColor: colors.card,
                        borderColor: isCurrentSkin ? colors.primary : colors.card,
                    },
                ]}
            >
                <>
                    <Image
                        resizeMode="contain"
                        style={styles.image}
                        source={{ uri: item.chromas[0].fullRender }}
                    />
                    {isLocked && (
                        <View style={styles.lockOverlay}>
                            <SvgLock color="white" width={24} height={24} />
                        </View>
                    )}
                    {skin.uuid === item.uuid && (
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
            horizontal
            data={sortedSkins}
            style={styles.list}
            indicatorStyle="white"
            renderItem={renderItem}
            showsHorizontalScrollIndicator
            getItemLayout={(_, index) => ({
                length: 116,
                offset: 124 * index,
                index,
            })}
            contentContainerStyle={styles.contentContainer}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        maxHeight: 116,
        padding: 0,
        flex: 1,
    },
    contentContainer: {
        gap: 8,
        justifyContent: "center",
    },
    card: {
        width: 116,
        padding: 8,
        borderWidth: 2,
        borderRadius: 16,
    },
    image: {
        width: 100,
        height: 100,
    },
    lockOverlay: {
        ...StyleSheet.absoluteFillObject,
        padding: 8,
        alignItems: "flex-end",
        justifyContent: "flex-end",
        backgroundColor: "rgba(255, 70, 86, .20)",
    },
    checkOverlay: {
        ...StyleSheet.absoluteFillObject,
        padding: 8,
        alignItems: "flex-end",
        justifyContent: "flex-end",
    },
});

export default React.memo(CollectionWeaponSkinList);
