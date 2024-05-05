import { Video } from "expo-av";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, LayoutChangeEvent, View } from "react-native";
import { VideoProps } from "expo-av/src/Video.types";
import { IconButton, TouchableRipple } from "react-native-paper";
// contexts
import useThemeContext from "@/contexts/hook/use-theme-context";

type PlayerProps = VideoProps & {
    onClose: () => void;
}

const Player = ({ source, onClose, ...props }: PlayerProps) => {

    const { colors } = useThemeContext();

    const videoRef = useRef<Video>(null);

    const [isLoading, setLoading] = useState(false);

    const [isPlaying, setIsPlaying] = useState(true);

    const [videoEnd, setVideoEnd] = useState(false);

    const [showControls, setShowControls] = useState(false);

    useEffect(() => {
        setIsPlaying(true);
        setVideoEnd(false);
        setShowControls(false);
    }, [source]);

    const togglePlayPause = async () => {
        if (isPlaying) {
            await videoRef.current?.pauseAsync();
        } else {
            await videoRef.current?.playAsync();
        }
        setIsPlaying(!isPlaying);
    };

    const replayVideo = async () => {
        await videoRef.current?.replayAsync();
        setIsPlaying(true);
        setVideoEnd(false);
        setShowControls(false);
    };

    const handleClose = onClose;

    const toggleShowControls = () => setShowControls(!showControls);

    const [videoLayout, setVideoLayout] = useState({ width: 0, height: 0 });

    const onVideoLayout = (event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;
        setVideoLayout({ width, height });
    };

    return (
        <View
            style={{
                position: "relative",
                height: videoLayout.height,
            }}
        >
            <TouchableRipple onPress={toggleShowControls} borderless style={{ borderRadius: 16 }}>
                <>
                    {isLoading && (
                        <View
                            style={{
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                position: "absolute",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                            }}
                        >
                            <ActivityIndicator size="large" color={colors.primary} />
                        </View>
                    )}
                    <Video
                        ref={videoRef}
                        source={source}
                        shouldPlay={isPlaying}
                        onLoadStart={() => setLoading(true)}
                        onReadyForDisplay={() => setLoading(false)}
                        onPlaybackStatusUpdate={(playbackStatus) => {
                            // @ts-ignore
                            if (playbackStatus.didJustFinish) {
                                setVideoEnd(true);
                                setIsPlaying(false);
                            }
                        }}
                        {...props}
                        onLayout={onVideoLayout}
                    />
                    {(showControls || videoEnd) && (
                        <View
                            style={{
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                maxHeight: 300,
                                position: "absolute",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                height: videoLayout.height,
                            }}
                        >
                            <IconButton
                                size={48}
                                mode="contained"
                                iconColor={colors.text}
                                onPress={replayVideo}
                                icon="replay"
                                style={{ backgroundColor: colors.primary }}
                            />

                            {!videoEnd && (
                                <IconButton
                                    size={48}
                                    mode="contained"
                                    iconColor={colors.text}
                                    onPress={togglePlayPause}
                                    icon={isPlaying ? "pause" : "play"}
                                    style={{ backgroundColor: colors.primary }}
                                />
                            )}
                        </View>
                    )}
                </>
            </TouchableRipple>
            <View style={{ position: "absolute", top: 0, right: 0, zIndex: 999 }}>
                <IconButton
                    icon="close"
                    onPress={handleClose}
                    iconColor="#000"
                    style={{ backgroundColor: colors.text }}
                />
            </View>
        </View>
    );
};

export default Player;

