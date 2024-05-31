import { ResizeMode } from "expo-av";
import React, { useState } from "react";
import { TouchableRipple } from "react-native-paper";
import { Dimensions, FlatList, Image, ImageBackground, View } from "react-native";
// components
import Player from "@/components/player";
import Text from "@/components/typography/text";
// contexts
import useThemeContext from "@/contexts/hook/use-theme-context";
// types
import { SkinDetailScreenProps } from "@/types/router/navigation";
// utils
import { getContentTierIcon } from "@/utils/content-tier-icon";
import { addSpaceBeforeUpperCase } from "@/utils/format-string";

const WIDTH = Dimensions.get("window").width;

const SkinDetails = ({ route }: SkinDetailScreenProps) => {

    const { colors } = useThemeContext();

    const { skin, skinType, theme } = route.params;

    const [currentImage, setCurrentImage] = useState(skin.levels[0].displayIcon ?? skin.chromas[0].displayIcon ?? skin.chromas[0].fullRender);

    const [currentIndex, setCurrentIndex] = useState<number>();

    const [currentVideo, setCurrentVideo] = useState<string | null>(null);

    const [currentChromaIndex, setCurrentChromaIndex] = useState<number>(0);

    const renderListChroma = (
        <View
            style={{
                gap: 16,
                display: "flex",
                flexDirection: "row",
                marginBottom: skin.levels.length <= 1 ? 16 : 0,
            }}
        >
            {skin.chromas.map((chroma, index) => (
                <TouchableRipple
                    key={index}
                    borderless
                    onPress={() => {
                        setCurrentChromaIndex(index);
                        setCurrentImage(chroma.fullRender);
                        setCurrentVideo(chroma.streamedVideo);
                    }}
                    style={{
                        width: 64,
                        height: 64,
                        padding: 4,
                        borderWidth: 2,
                        borderRadius: 22,
                        justifyContent: "center",
                        backgroundColor: "#222429",
                        borderColor: currentChromaIndex === index ? colors.primary : "#222429",
                    }}
                >
                    <Image
                        source={{ uri: chroma.swatch }}
                        style={{ width: 52, height: 52, borderRadius: 16 }}
                    />
                </TouchableRipple>
            ))}
        </View>
    );

    const renderList = (
        <FlatList
            data={skin.levels}
            style={{ flex: 1 }}
            overScrollMode="never"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 8, paddingBottom: 16 }}
            renderItem={({ item, index }) => (
                <TouchableRipple
                    borderless
                    rippleColor={colors.primary}
                    onPress={() => {
                        setCurrentVideo(item.streamedVideo);
                        setCurrentIndex(index);
                    }}
                    style={{
                        padding: 16,
                        borderRadius: 16,
                        backgroundColor: index === currentIndex ? colors.primary + "8C" : "#222429",
                    }}
                >
                    <>
                        <Text variant="headlineSmall">Level {index + 1}</Text>

                        {item.levelItem && (
                            <Text variant="bodyLarge" style={{ opacity: .5 }}>
                                {addSpaceBeforeUpperCase(item?.levelItem?.split("::")[1])}
                            </Text>
                        )}
                    </>
                </TouchableRipple>
            )}
        />
    );

    return (
        <View
            style={{
                gap: 16,
                flex: 1,
                paddingHorizontal: 16,
                flexDirection: "column",
                backgroundColor: colors.background,
            }}
        >
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 16 }}>
                <View style={{ flex: 1 }}>
                    <Text
                        numberOfLines={2}
                        adjustsFontSizeToFit
                        variant="displayLarge"
                        style={{ fontFamily: "Vandchrome" }}
                    >
                        {theme.displayName}
                    </Text>
                    <Text
                        variant="titleLarge"
                        style={{
                            color: colors.text,
                            opacity: .5,
                            textTransform: "uppercase",
                            fontFamily: "Nota",
                        }}
                    >
                        {skinType}
                    </Text>
                </View>
                <Image source={getContentTierIcon(skin.contentTierUuid)} style={{ width: 32, height: 32 }} />
            </View>

            <View
                style={{
                    flex: 1,
                    gap: 16,
                    display: "flex",
                    overflow: "hidden",
                    position: "relative",
                    flexDirection: "column",
                    paddingBottom: skin.chromas.length <= 1 && skin.levels.length <= 1 ? 16 : 0,
                }}
            >
                <View style={{ flex: 1, borderRadius: 16, overflow: "hidden" }}>
                    <ImageBackground source={{ uri: skin.wallpaper }} style={{ borderRadius: 16 }}>
                        {currentVideo ? (
                            <Player
                                onClose={() => {
                                    setCurrentVideo(null);
                                    setCurrentIndex(undefined);
                                }}
                                shouldPlay
                                useNativeControls={false}
                                source={{ uri: currentVideo }}
                                resizeMode={ResizeMode.COVER}
                                style={{ minHeight: 200, maxWidth: WIDTH }}
                            />
                        ) : (
                            <Image
                                source={{ uri: currentImage }}
                                style={{
                                    height: "100%",
                                    maxWidth: WIDTH,
                                    marginHorizontal: 16,
                                    // transform: [{ rotate: "22.5deg" }],
                                }}
                                resizeMode={skin.levels.length > 1 ? "contain" : "contain"}
                            />
                        )}
                    </ImageBackground>
                </View>

                {skin.chromas.length > 1 && renderListChroma}

                {skin.levels.length > 1 && renderList}

            </View>
        </View>
    );
};

export default SkinDetails;
