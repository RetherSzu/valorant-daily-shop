import { WebView } from "react-native-webview";
import * as SecureStore from "expo-secure-store";
import { Modal, StyleSheet, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { WebViewNativeEvent } from "react-native-webview/lib/WebViewTypes";
// contexts
import useAuthContext from "@/contexts/hook/use-auth-context";

const LoginWebView = () => {
    const webViewRef = useRef(null);
    const [shownSignIn, setShownSignIn] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const { login } = useAuthContext();

    useEffect(() => {
        return () => {
            // Cleanup if the component is unmounted
            cleanupWebView();
        };
    }, []);

    const checkForToken = async (url: string) => {
        if (url.startsWith("https://playvalorant.com/") && url.includes("access_token")) {
            cleanupWebView();

            if (shownSignIn) {
                // Close the modal
                setModalVisible(false);
            }

            try {
                const searchParams = new URLSearchParams((new URL(url)).hash.slice(1));
                const access_token = searchParams.get("access_token");
                const id_token = searchParams.get("id_token");

                if (access_token && id_token) {
                    SecureStore.setItem("access_token", access_token);
                    SecureStore.setItem("id_token", id_token);

                    await login();
                }
            } catch (e) {
                console.error(e);
                // onAuthFailure(e);
            }
        }
    };

    const handleNavigationStateChange = (event: WebViewNativeEvent) => {
        const { url } = event;
        if (url.startsWith("https://authenticate.riotgames.com") && !shownSignIn) {
            setShownSignIn(true);
            setModalVisible(true);
        }
        (async () => checkForToken(url))();
    };

    const cleanupWebView = () => {
        if (webViewRef.current) {
            // @ts-ignore
            webViewRef.current?.stopLoading();
        }
        setShownSignIn(false);
    };

    return (
        <View style={styles.container}>
            <Modal
                visible={modalVisible}
                onRequestClose={cleanupWebView}
                animationType="slide"
            >
                <WebView
                    ref={webViewRef}
                    source={{
                        uri: "https://auth.riotgames.com/authorize?redirect_uri=https%3A%2F%2Fplayvalorant.com%2Fopt_in&client_id=play-valorant-web-prod&response_type=token%20id_token&nonce=1&scope=account%20openid",
                    }}
                    onNavigationStateChange={handleNavigationStateChange}
                    style={styles.webView}
                />
            </Modal>
            {!shownSignIn && (
                <WebView
                    ref={webViewRef}
                    source={{
                        uri: "https://auth.riotgames.com/authorize?redirect_uri=https%3A%2F%2Fplayvalorant.com%2Fopt_in&client_id=play-valorant-web-prod&response_type=token%20id_token&nonce=1&scope=account%20openid",
                    }}
                    style={{ display: "none" }}
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
    webView: {
        flex: 1,
    },
});

export default LoginWebView;
