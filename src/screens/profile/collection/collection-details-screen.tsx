import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Dimensions, Image, ImageBackground, StyleSheet, View } from "react-native";
// api
import valorantProvider from "@/api/valorant-provider";
import { useGetWeaponByIdQuery } from "@/api/rtk-valorant-api";
// components
import Button from "@/components/button/button";
import Text from "@/components/typography/text";
import Loading from "@/components/loading/loading";
import SvgFavorite from "@/components/icon/favorite";
import SvgFavoriteDisable from "@/components/icon/favorite-disable";
// contexts
import useThemeContext from "@/contexts/hook/use-theme-context";
import useProfileContext from "@/contexts/hook/use-profile-context";
// types
import { WeaponSkin } from "@/types/api/shop/weapon-skin";
import { PlayerLoadoutGun } from "@/types/api/player-loadout";
import { CollectionDetailScreenProps } from "@/types/router/navigation";
// utils
import { getContentTierIcon } from "@/utils/content-tier-icon";
//
import CollectionLevelList from "./collection-level-list";
import CollectionChromaList from "./collection-chroma-list";
import CollectionWeaponSkinList from "./collection-weapon-skin-list";

const WIDTH = Dimensions.get("window").width;

const CollectionDetailsScreen = ({ route }: CollectionDetailScreenProps) => {

    const {
        skins,
        skinVariants,
        setPlayerLoadout,
        currentPlayerLoadoutSkin,
        currentPlayerLoadoutGun,
        setCurrentPlayerLoadoutGun,
        setCurrentPlayerLoadoutSkin,
        favoriteSkins,
        setFavoriteSkins,
        defaultPlayerLoadout,
    } = useProfileContext();

    const { colors } = useThemeContext();

    const [currentSkin, setCurrentSkin] = useState(currentPlayerLoadoutSkin as WeaponSkin);

    const [sortedSkins, setSortedSkins] = useState<WeaponSkin[]>([]);

    const [isLoading, setLoading] = useState<boolean>(false);

    const [isLoadingFavorite, setLoadingFavorite] = useState<boolean>(false);

    const [currentLevelIndex, setCurrentLevelIndex] = useState<number | undefined>();

    const [currentChromaIndex, setCurrentChromaIndex] = useState<number>(
        currentPlayerLoadoutSkin?.chromas.findIndex(
            (chroma) => chroma.uuid === currentPlayerLoadoutGun?.ChromaID,
        ) ?? 0,
    );

    const [textButton, setTextButton] = useState<string>("Equip skin");

    const onCardPress = (skinSelected: WeaponSkin) => {
        setCurrentImage(skinSelected.chromas[0].fullRender);
        setCurrentSkin(skinSelected);
        setCurrentChromaIndex(0);
        setCurrentLevelIndex(undefined);
    };

    const {
        data: weaponData,
        isLoading: isLoadingWeapon,
    } = useGetWeaponByIdQuery(currentPlayerLoadoutGun?.ID ?? "");

    const disabled = useMemo(() => {
        const isDefaultTheme = currentSkin.themeUuid !== "0d7a5bfb-4850-098e-1821-d989bbfd58a8";
        const isNotDefaultSkin = currentSkin.uuid !== weaponData?.data.defaultSkinUuid;
        const isNotOwned = !skins?.Entitlements.some((entitlement) =>
            currentSkin.levels[currentLevelIndex ?? 0]?.uuid === entitlement.ItemID,
        );
        const isNotOwnedChroma = !skinVariants?.Entitlements.some((entitlement) =>
            currentSkin.chromas[currentChromaIndex]?.uuid === entitlement.ItemID,
        ) && currentChromaIndex !== 0;

        if (isNotOwnedChroma || (isDefaultTheme && isNotDefaultSkin && isNotOwned)) {
            return true;
        }

        if (currentSkin.uuid !== currentPlayerLoadoutSkin?.uuid) {
            setTextButton("Equip skin");
            return false;
        }

        if (currentLevelIndex === undefined || currentSkin.levels[currentLevelIndex]?.uuid === currentPlayerLoadoutGun?.SkinLevelID) {
            return true;
        }

        setTextButton("Set level");
        return false;
    }, [
        currentSkin,
        weaponData,
        skins,
        currentPlayerLoadoutSkin,
        currentPlayerLoadoutGun?.SkinLevelID,
        currentLevelIndex,
        currentChromaIndex,
        skinVariants,
    ]);

    const isFavorite = useMemo(() => {
        return Object.keys(favoriteSkins?.FavoritedContent ?? {}).some((key) => favoriteSkins?.FavoritedContent[key].ItemID === currentSkin.chromas[currentChromaIndex].uuid);
    }, [currentSkin, favoriteSkins, currentChromaIndex]);

    const isFavoriteDisabled = useMemo(() => {
        if (weaponData?.data.defaultSkinUuid === currentSkin.uuid) return false;
        if (currentSkin.themeUuid === "0d7a5bfb-4850-098e-1821-d989bbfd58a8") return true;
        if (!skins?.Entitlements.some((entitlement) =>
            currentSkin.levels.some((level) => level.uuid === entitlement.ItemID))
        ) {
            return true;
        }
        if (currentChromaIndex === 0) return false;
        if (!skinVariants?.Entitlements.some((entitlement) =>
            currentSkin.chromas[currentChromaIndex].uuid === entitlement.ItemID)
        ) {
            return true;
        }
    }, [weaponData, currentSkin, skins, currentChromaIndex, skinVariants]);

    const [currentImage, setCurrentImage] = useState(
        currentPlayerLoadoutSkin?.chromas.find(
            (chroma) => chroma.uuid === currentPlayerLoadoutGun?.ChromaID,
        )?.fullRender || currentPlayerLoadoutSkin?.chromas[0].fullRender,
    );

    const sortWeaponSkinsByOwned = () => {
        if (!weaponData) {
            return [];
        }

        const copy = [...weaponData.data.skins];

        // Move the skin with UUID equal to playerLoadoutGun.SkinID to the first position
        copy.sort((a, b) => {
            if (a.uuid === currentPlayerLoadoutGun?.SkinID) return -1;
            if (b.uuid === currentPlayerLoadoutGun?.SkinID) return 1;
            if (a.uuid === weaponData.data.defaultSkinUuid) return -1;
            if (b.uuid === weaponData.data.defaultSkinUuid) return 1;
            if (a.themeUuid === "0d7a5bfb-4850-098e-1821-d989bbfd58a8") return -1;
            if (b.themeUuid === "0d7a5bfb-4850-098e-1821-d989bbfd58a8") return 1;

            const aOwned = skins?.Entitlements.some((entitlement) =>
                a.levels.some((level) => level.uuid === entitlement.ItemID),
            );
            const bOwned = skins?.Entitlements.some((entitlement) =>
                b.levels.some((level) => level.uuid === entitlement.ItemID),
            );

            if (aOwned && !bOwned) return -1;
            if (!aOwned && bOwned) return 1;

            return 0;
        });

        return copy;
    };

    useFocusEffect(
        useCallback(() => {
            setSortedSkins(sortWeaponSkinsByOwned());
        }, [route.params, weaponData, currentPlayerLoadoutSkin]),
    );

    useEffect(() => {
    }, [currentPlayerLoadoutGun, favoriteSkins]);

    const handleChromaPress = useCallback((index: number, fullRender: string) => {
        setCurrentChromaIndex(index);
        setCurrentImage(fullRender);
    }, []);

    const handleLevelPress = useCallback((index: number) => {
        setCurrentLevelIndex(index);
    }, []);

    const handleEquip = useCallback(async () => {
        if (isLoading || !defaultPlayerLoadout) return;
        setLoading(true);

        const newPlayerLoadout = await valorantProvider.setPlayerLoadout(
            defaultPlayerLoadout,
            currentPlayerLoadoutGun?.ID ?? "",
            currentSkin.uuid,
            currentSkin.levels[currentLevelIndex ?? 0].uuid,
            currentSkin.chromas[currentChromaIndex].uuid,
        );
        setPlayerLoadout(newPlayerLoadout);
        setCurrentPlayerLoadoutSkin(currentSkin);
        try {
            const playerLoadoutGun = newPlayerLoadout.Guns.find((gun) => gun.ID === currentPlayerLoadoutGun?.ID);
            if (playerLoadoutGun) {
                setCurrentPlayerLoadoutGun(playerLoadoutGun);
            }
        } catch (error) {
            // Error handling
        } finally {
            setLoading(false);
        }
    }, [currentPlayerLoadoutGun?.ID, currentSkin, currentLevelIndex, currentChromaIndex, isLoading]);

    const handleFavorite = useCallback(async () => {
        if (isLoadingFavorite) return;
        setLoadingFavorite(true);
        if (isFavorite) {
            const response = await valorantProvider.deletePlayerFavoriteSkin(currentSkin.chromas[currentChromaIndex].uuid);
            setFavoriteSkins(response);
            setLoadingFavorite(false);
            return;
        }
        const response = await valorantProvider.addPlayerFavoriteSkin(currentSkin.chromas[currentChromaIndex].uuid);
        setFavoriteSkins(response);
        setLoadingFavorite(false);
    }, [currentSkin, currentChromaIndex]);

    const renderListChroma = useMemo(() => (
        <CollectionChromaList
            currentSkin={currentSkin}
            currentChromaIndex={currentChromaIndex}
            handleChromaPress={handleChromaPress}
        />
    ), [currentSkin, currentChromaIndex, handleChromaPress]);

    const renderLevelList = useMemo(() => (
        <CollectionLevelList
            skin={currentPlayerLoadoutSkin as WeaponSkin}
            currentSkin={currentSkin}
            playerLoadoutGun={currentPlayerLoadoutGun as PlayerLoadoutGun}
            handleLevelPress={handleLevelPress}
            currentLevelIndex={currentLevelIndex}
        />
    ), [currentPlayerLoadoutSkin, currentSkin, currentPlayerLoadoutGun?.SkinLevelID, handleLevelPress, currentLevelIndex]);

    const renderWeaponSkins = useMemo(() => (
        <CollectionWeaponSkinList
            skin={currentPlayerLoadoutSkin as WeaponSkin}
            skins={skins}
            weaponData={weaponData}
            sortedSkins={sortedSkins}
            currentSkin={currentSkin}
            onCardPress={onCardPress}
        />
    ), [sortedSkins, currentSkin, weaponData, skins]);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Text numberOfLines={1} adjustsFontSizeToFit variant="displayLarge" style={styles.title}>
                        {currentSkin.displayName}
                    </Text>
                </View>
                <Image
                    resizeMode="contain"
                    source={getContentTierIcon(currentSkin.contentTierUuid)} style={styles.icon}
                />
            </View>
            <View style={styles.content}>
                <View style={styles.imageWrapper}>
                    <ImageBackground source={{ uri: currentSkin.wallpaper }} style={styles.imageBackground}>
                        <Image source={{ uri: currentImage }} style={styles.currentImage} resizeMode="contain" />
                    </ImageBackground>
                </View>
            </View>

            {currentSkin.chromas.length > 1 && renderListChroma}

            {currentSkin.levels.length > 1 && renderLevelList}

            {isLoadingWeapon ? <Loading /> : renderWeaponSkins}

            <View
                style={{
                    gap: 8,
                    display: "flex",
                    maxWidth: "100%",
                    flexDirection: "row",
                }}
            >
                <Button
                    style={{ maxWidth: 64 }}
                    onPress={handleFavorite}
                    backgroundColor="#222429"
                    loading={isLoadingFavorite}
                    disabled={isFavoriteDisabled}
                    icon={isLoadingFavorite ? null : isFavorite ? <SvgFavorite color="#FFE500" /> :
                        <SvgFavoriteDisable />}
                />
                <Button
                    text={textButton}
                    loading={isLoading}
                    disabled={disabled}
                    onPress={handleEquip}
                    underlayColor="#222429"
                    backgroundColor={colors.primary}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 16,
        paddingBottom: 16,
        paddingHorizontal: 16,
        flexDirection: "column",
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 16,
    },
    titleContainer: {
        flex: 1,
    },
    title: {
        fontFamily: "Vandchrome",
    },
    subtitle: {
        opacity: 0.5,
        textTransform: "uppercase",
        fontFamily: "Nota",
    },
    icon: {
        width: 32,
        height: "100%",
    },
    content: {
        flex: 1,
        gap: 16,
        display: "flex",
        overflow: "hidden",
        position: "relative",
        flexDirection: "column",
    },
    imageWrapper: {
        flex: 1,
        borderRadius: 16,
        overflow: "hidden",
    },
    imageBackground: {
        borderRadius: 16,
    },
    videoPlayer: {
        minHeight: 200,
        maxWidth: WIDTH,
    },
    currentImage: {
        height: "100%",
        maxWidth: WIDTH,
        marginHorizontal: 16,
    },
    chromaContainer: {
        gap: 16,
        display: "flex",
        flexDirection: "row",
    },
    chromaItem: {
        width: 64,
        height: 64,
        padding: 4,
        borderWidth: 2,
        borderRadius: 22,
        position: "relative",
        justifyContent: "center",
        backgroundColor: "#222429",
    },
    chromaImage: {
        width: 52,
        height: 52,
        borderRadius: 16,
    },
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
    },
    levelText: {
        opacity: 0.5,
    },
});

export default React.memo(CollectionDetailsScreen);
