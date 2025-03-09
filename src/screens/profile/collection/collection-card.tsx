import React, { useCallback, useMemo } from "react";
import { TouchableRipple } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Image, ImageBackground, StyleSheet } from "react-native";
// api
import { useGetThemeByIdQuery, useGetWeaponByLevelIdQuery } from "@/api/rtk-valorant-api";
// components
import Error from "@/components/error/error";
import Text from "@/components/typography/text";
// context
import useThemeContext from "@/contexts/hook/use-theme-context";
import useProfileContext from "@/contexts/hook/use-profile-context";
// types
import { NavigationProp } from "@/types/router/navigation";
import { PlayerLoadoutGun } from "@/types/api/player-loadout";
// utils
import { getWeaponName } from "@/utils/format-string";
import { getWeaponByUuid } from "@/utils/weapon-name";
//
import CollectionCardSkeleton from "./collection-card-skeleton";

type Props = {
    playerLoadoutGun: PlayerLoadoutGun;
}

const CollectionCard = ({ playerLoadoutGun }: Props) => {

    const { colors } = useThemeContext();

    const { setCurrentPlayerLoadoutSkin , setCurrentPlayerLoadoutGun} = useProfileContext();

    const navigate = useNavigation<NavigationProp>();

    const {
        data: weaponSkinData,
        error: weaponSkinError,
        isLoading: isLoadingWeapon,
    } = useGetWeaponByLevelIdQuery(playerLoadoutGun.SkinLevelID);

    const {
        data: themeData,
        error: themeError,
        isLoading: isLoadingTheme,
    } = useGetThemeByIdQuery(weaponSkinData?.data?.themeUuid || "");

    const skinData = weaponSkinData?.data;

    const filteredDisplayName = useMemo(() => {
        if (!weaponSkinData?.data?.displayName || !themeData?.data?.displayName) return "";
        return getWeaponName(weaponSkinData.data.displayName, themeData.data.displayName);
    }, [weaponSkinData?.data?.displayName, themeData?.data?.displayName]);

    const onCardPress = useCallback(() => {
        if (!weaponSkinData || !themeData) return;
        setCurrentPlayerLoadoutSkin(weaponSkinData.data);
        setCurrentPlayerLoadoutGun(playerLoadoutGun);
        navigate.navigate("CollectionDetails");
    }, [navigate, weaponSkinData, themeData, filteredDisplayName, playerLoadoutGun]);

    if (isLoadingWeapon || isLoadingTheme) {
        return <CollectionCardSkeleton />;
    }

    if (weaponSkinError || !skinData || themeError || !themeData) {
        return <Error />;
    }

    return (
        <TouchableRipple
            borderless
            onPress={onCardPress}
            key={playerLoadoutGun.ID}
            rippleColor="rgba(255, 70, 86, .20)"
            style={[styles.container, { backgroundColor: colors.card }]}
        >
            <ImageBackground
                resizeMode="cover"
                style={styles.imageBackground}
                source={{ uri: skinData.wallpaper }}
            >
                <Text variant="titleLarge" numberOfLines={1}>{getWeaponByUuid(playerLoadoutGun.ID)}</Text>
                <Image
                    resizeMode="contain"
                    style={styles.skinImage}
                    source={{ uri: skinData.chromas.find((weaponChroma) => weaponChroma.uuid === playerLoadoutGun.ChromaID)?.fullRender }}
                />
            </ImageBackground>
        </TouchableRipple>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 16,
    },
    imageBackground: {
        gap: 16,
        padding: 16,
    },
    skinImage: {
        flex: 1,
        height: 70,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    contentTierIcon: {
        width: 32,
        height: 32,
    },
});

export default React.memo(CollectionCard);
