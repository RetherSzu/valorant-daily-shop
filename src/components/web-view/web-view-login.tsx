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
import { getWebViewState, saveWebViewState, WebViewState } from "@/utils/web-view-state";

const LoginWebView = () => {
    const { login } = useAuthContext();
    const { colors } = useThemeContext();
    const webViewRef = useRef(null);
    const [shownSignIn, setShownSignIn] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [savedState, setSavedState] = useState<WebViewState | null>(null);

    const checkForToken = useCallback(async (url: string) => {
        console.log("URL:", url);
        if (url.startsWith("https://playvalorant.com/") && url.includes("access_token")) {
            cleanupWebView();
            if (shownSignIn) {
                setModalVisible(false);
            }

            console.log("URL:", url);

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

    const handleNavigationStateChange = useCallback(async (event: WebViewNativeEvent) => {
        const { url } = event;
        
        // Save WebView state
        const currentState: WebViewState = {
            url,
            timestamp: Date.now()
        };
        await saveWebViewState(currentState);

        if (url.startsWith("https://authenticate.riotgames.com") && !shownSignIn) {
            setShownSignIn(true);
            setModalVisible(true);
        }
        (() => checkForToken(url))();
    }, [checkForToken, shownSignIn]);

    const cleanupWebView = useCallback(() => {
        if (webViewRef.current) {
            // @ts-ignore
            webViewRef.current?.stopLoading();
        }
        setShownSignIn(false);
    }, []);

    // Load saved state when component mounts
    useEffect(() => {
        const loadSavedState = async () => {
            const state = await getWebViewState("https://auth.riotgames.com/authorize");
            if (state) {
                setSavedState(state);
            }
        };
        loadSavedState();
    }, []);

    const clearWebViewData = useCallback(async () => {
        try {
            // Clear WebView cache and cookies using WebView's built-in methods
            if (webViewRef.current) {
                // @ts-ignore
                webViewRef.current?.clearCache(true);
                // @ts-ignore
                webViewRef.current?.clearHistory();
                // @ts-ignore
                webViewRef.current?.injectJavaScript(`
                    (function() {
                        document.cookie.split(";").forEach(function(c) { 
                            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
                        });
                    })();
                    true;
                `);
            }
            
            // Clear saved state by setting an empty state
            const emptyState: WebViewState = {
                url: initialUrl,
                timestamp: Date.now()
            };
            await saveWebViewState(emptyState);
            setSavedState(emptyState);
            
            // Reset component state
            setShownSignIn(false);
            setModalVisible(false);
        } catch (error) {
            console.error('Error clearing WebView data:', error);
        }
    }, []);

    // Add this effect to clear data when component mounts
    useEffect(() => {
        clearWebViewData();
        return () => {
            cleanupWebView();
            setLoading(false);
        };
    }, [clearWebViewData]);

    if (loading) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <View style={styles.loadingOverlay}>
                    <Loading />
                </View>
            </View>
        );
    }

    const initialUrl = "https://auth.riotgames.com/authorize?redirect_uri=https%3A%2F%2Fplayvalorant.com%2Fopt_in&client_id=play-valorant-web-prod&response_type=token%20id_token&nonce=1&scope=account%20openid";

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.loadingOverlay}>
                <Loading />
            </View>
            <Modal visible={modalVisible} onRequestClose={() => {
                clearWebViewData();
                cleanupWebView();
            }} animationType="slide">
                <WebView
                    ref={webViewRef}
                    incognito={true}
                    style={styles.webView}
                    source={{
                        uri: savedState?.url || initialUrl
                    }}
                    sharedCookiesEnabled={false}
                    onLoadStart={() => {
                        // Clear cookies on load start using JavaScript
                        if (webViewRef.current) {
                            // @ts-ignore
                            webViewRef.current?.injectJavaScript(`
                                (function() {
                                    document.cookie.split(";").forEach(function(c) { 
                                        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
                                    });
                                })();
                                true;
                            `);
                        }
                    }}
                    injectedJavaScript={`(function() {
                          if (window.location.href.startsWith("https://playvalorant.com")) {
                              window.ReactNativeWebView.postMessage(document.cookie);
                          }
                    })(); true;`}
                    onMessage={(event) => {
                        const cookies = event.nativeEvent.data;
                        console.log("1 - Cookies:", cookies);
                    }}
                    onNavigationStateChange={handleNavigationStateChange}
                />
            </Modal>
            {!shownSignIn && (
                <WebView
                    ref={webViewRef}
                    incognito={true}
                    source={{
                        uri: savedState?.url || initialUrl
                    }}
                    sharedCookiesEnabled={false}
                    onLoadStart={() => {
                        // Clear cookies on load start using JavaScript
                        if (webViewRef.current) {
                            // @ts-ignore
                            webViewRef.current?.injectJavaScript(`
                                (function() {
                                    document.cookie.split(";").forEach(function(c) { 
                                        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
                                    });
                                })();
                                true;
                            `);
                        }
                    }}
                    injectedJavaScript={`(function() {
                          if (window.location.href.startsWith("https://playvalorant.com")) {
                              window.ReactNativeWebView.postMessage(document.cookie);
                          }
                    })(); true;`}
                    onMessage={(event) => {
                        const cookies = event.nativeEvent.data;
                        console.log("2 - Cookies:", cookies);
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
