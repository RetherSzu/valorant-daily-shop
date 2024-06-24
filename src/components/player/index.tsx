import { Video } from "expo-av";
import { VideoProps } from "expo-av/src/Video.types";
import { IconButton, TouchableRipple } from "react-native-paper";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, LayoutChangeEvent, StyleSheet, View } from "react-native";
// contexts
import useThemeContext from "@/contexts/hook/use-theme-context";

type PlayerProps = VideoProps & {
    onClose: () => void;
};

const Player: React.FC<PlayerProps> = ({ source, onClose, ...props }) => {
    const { colors } = useThemeContext();
    const videoRef = useRef<Video>(null);

    const [isLoading, setLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const [videoEnd, setVideoEnd] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const [videoLayout, setVideoLayout] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setLoading(true);
        setIsPlaying(true);
        setVideoEnd(false);
        setShowControls(false);
    }, [source]);

    const togglePlayPause = useCallback(async () => {
        if (isPlaying) {
            await videoRef.current?.pauseAsync();
        } else {
            await videoRef.current?.playAsync();
        }
        setIsPlaying((prev) => !prev);
    }, [isPlaying]);

    const replayVideo = useCallback(async () => {
        await videoRef.current?.replayAsync();
        setIsPlaying(true);
        setVideoEnd(false);
        setShowControls(false);
    }, []);

    const toggleShowControls = useCallback(() => setShowControls((prev) => !prev), []);

    const onVideoLayout = useCallback((event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;
        setVideoLayout({ width, height });
    }, []);

    return (
        <View style={{ ...styles.container, height: videoLayout.height }}>
            <TouchableRipple onPress={toggleShowControls} borderless style={styles.ripple}>
                <>
                    {isLoading && (
                        <View style={styles.loadingOverlay}>
                            <ActivityIndicator size="large" color={colors.primary} />
                        </View>
                    )}
                    <Video
                        ref={videoRef}
                        source={source}
                        shouldPlay={isPlaying}
                        onLayout={onVideoLayout}
                        onLoadStart={() => setLoading(true)}
                        onReadyForDisplay={() => setLoading(false)}
                        onPlaybackStatusUpdate={(status) => {
                            if (!status.isLoaded) {
                                setLoading(true);
                            } else if (status.didJustFinish) {
                                setVideoEnd(true);
                                setIsPlaying(false);
                            }
                        }}
                        {...props}
                    />
                    {(showControls || videoEnd) && (
                        <View style={{ ...styles.controlsOverlay, height: videoLayout.height }}>
                            <IconButton
                                size={48}
                                icon="replay"
                                mode="contained"
                                onPress={replayVideo}
                                iconColor={colors.text}
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
            <View style={styles.closeButton}>
                <IconButton
                    icon="close"
                    onPress={onClose}
                    iconColor="#000"
                    style={{ backgroundColor: colors.text }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "relative",
    },
    ripple: {
        borderRadius: 16,
    },
    loadingOverlay: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    controlsOverlay: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
        position: "absolute",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    closeButton: {
        top: 0,
        right: 0,
        zIndex: 999,
        position: "absolute",
    },
});

export default Player;
