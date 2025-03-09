import { WebView } from "react-native-webview";
import { Modal, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { WebViewNativeEvent } from "react-native-webview/lib/WebViewTypes";
// components
import Loading from "@/components/loading/loading";
// contexts
import useAuthContext from "@/contexts/hook/use-auth-context";
import useThemeContext from "@/contexts/hook/use-theme-context";
// utils
import secureStore from "@/utils/secure-store";

const LoginWebView = () => {
    const { login } = useAuthContext();
    const { colors } = useThemeContext();
    const webViewRef = useRef(null);
    const [shownSignIn, setShownSignIn] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        return () => {
            cleanupWebView();
            setLoading(false);
        };
    }, []);

    const checkForToken = useCallback(async (url: string) => {
        if (url.startsWith("https://playvalorant.com/") && url.includes("access_token")) {
            cleanupWebView();
            if (shownSignIn) {
                setModalVisible(false);
            }

            const searchParams = new URLSearchParams(new URL(url).hash.slice(1));
            const access_token = searchParams.get("access_token");
            const id_token = searchParams.get("id_token");

            if (access_token && id_token) {
                setLoading(true);
                setModalVisible(false);
                await secureStore.setItem("access_token", access_token);
                await secureStore.setItem("id_token", id_token);
                await login();
                setLoading(false);
            }
        }
    }, [shownSignIn, login]);

    const handleNavigationStateChange = useCallback((event: WebViewNativeEvent) => {
        const { url } = event;
        if (url.startsWith("https://authenticate.riotgames.com") && !shownSignIn) {
            setShownSignIn(true);
            setModalVisible(true);
        }
        checkForToken(url);
    }, [checkForToken, shownSignIn]);

    const cleanupWebView = useCallback(() => {
        if (webViewRef.current) {
            // @ts-ignore
            webViewRef.current?.stopLoading();
        }
        setShownSignIn(false);
    }, []);

    if (loading) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <View style={styles.loadingOverlay}>
                    <Loading />
                </View>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.loadingOverlay}>
                <Loading />
            </View>
            <Modal visible={modalVisible} onRequestClose={cleanupWebView} animationType="slide">
                <WebView
                    ref={webViewRef}
                    incognito={true}
                    source={{
                        uri: "https://auth.riotgames.com/authorize?redirect_uri=https%3A%2F%2Fplayvalorant.com%2Fopt_in&client_id=play-valorant-web-prod&response_type=token%20id_token&nonce=1&scope=account%20openid",
                    }}
                    style={styles.webView}
                    onNavigationStateChange={handleNavigationStateChange}
                />
            </Modal>
            {!shownSignIn && (
                <WebView
                    ref={webViewRef}
                    incognito={true}
                    source={{
                        uri: "https://auth.riotgames.com/authorize?redirect_uri=https%3A%2F%2Fplayvalorant.com%2Fopt_in&client_id=play-valorant-web-prod&response_type=token%20id_token&nonce=1&scope=account%20openid",
                    }}
                    style={styles.hiddenWebView}
                    onNavigationStateChange={handleNavigationStateChange}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingOverlay: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: "absolute",
    },
    webView: {
        flex: 1,
    },
    hiddenWebView: {
        display: "none",
    },
});

export default React.memo(LoginWebView);
