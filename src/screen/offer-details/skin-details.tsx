import { useState } from "react";
import { ResizeMode } from "expo-av";
import { TouchableRipple } from "react-native-paper";
import { Dimensions, FlatList, Image, View } from "react-native";
// component
import Player from "@/component/player";
import Text from "@/component/typography/text";
// context
import useThemeContext from "@/context/hook/use-theme-context";
// type
import { SkinDetailScreenProps } from "@/type/router/navigation";
// util
import { getContentTierIcon } from "@/util/content-tier-icon";
import { addSpaceBeforeUpperCase } from "@/util/format-string";

const WIDTH = Dimensions.get("window").width;

const SkinDetails = ({ route }: SkinDetailScreenProps) => {

    const { colors } = useThemeContext();

    const { skin, skinType, theme } = route.params;

    const [currentImage, setCurrentImage] = useState(skin.displayIcon ?? skin.chromas[0].displayIcon ?? skin.chromas[0].fullRender);

    const [currentIndex, setCurrentIndex] = useState<number>();

    const [currentVideo, setCurrentVideo] = useState<string | null>(null);

    const [currentChromaIndex, setCurrentChromaIndex] = useState<number>(0);

    const renderListChroma = (
        <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
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
                        backgroundColor: "#222429",
                        borderRadius: 22,
                        width: 64, height: 64,
                        borderColor: currentChromaIndex === index ? colors.primary : "#222429",
                        borderWidth: 2,
                        padding: 4,
                        justifyContent: "center",
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
            contentContainerStyle={{ gap: 8 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
                <TouchableRipple
                    borderless
                    rippleColor={colors.primary}
                    onPress={() => {
                        setCurrentVideo(item.streamedVideo);
                        setCurrentIndex(index);
                    }}
                    style={{
                        backgroundColor: index === currentIndex ? colors.primary + "8C" : "#222429",
                        padding: 16,
                        borderRadius: 16,
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
                backgroundColor: colors.background,
                flex: 1,
                paddingHorizontal: 16,
                flexDirection: "column",
                gap: 16,
            }}
        >
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <View>
                    <Text variant="displayLarge" style={{ color: colors.text, fontFamily: "Vandchrome" }}>
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
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <View style={{ flex: 1 }}>
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
                                transform: [{ rotate: "22.5deg" }],
                            }}
                            resizeMode="center"
                        />
                    )}
                </View>

                {skin.chromas.length > 1 && renderListChroma}

                {skin.levels.length > 1 && renderList}

            </View>
        </View>
    );
};

export default SkinDetails;
