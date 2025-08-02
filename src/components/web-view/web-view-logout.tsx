import { WebView } from "react-native-webview";
import { StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { WebViewNativeEvent } from "react-native-webview/lib/WebViewTypes";
// components
import Loading from "@/components/loading/loading";
// contexts
import useAuthContext from "@/contexts/hook/use-auth-context";
import useThemeContext from "@/contexts/hook/use-theme-context";
// types
import { LogoutScreenProps } from "@/types/router/navigation";
// utils
import user from "@/utils/users";
import { getWebViewState, saveWebViewState, WebViewState } from "@/utils/web-view-state";

const LogoutWebView = ({ route, navigation }: LogoutScreenProps) => {
    const { username } = route.params;
    const webViewRef = useRef(null);
    const { logoutUser, dispatch } = useAuthContext();
    const { colors } = useThemeContext();
    const [savedState, setSavedState] = useState<WebViewState | null>(null);

    // Load saved state when component mounts
    useEffect(() => {
        const loadSavedState = async () => {
            const state = await getWebViewState("https://auth.riotgames.com/logout");
            if (state) {
                setSavedState(state);
            }
        };
        loadSavedState();
    }, []);

    const handleNavigationStateChange = useCallback(async (event: WebViewNativeEvent) => {
        const { url } = event;
        
        // Save WebView state
        const currentState: WebViewState = {
            url,
            timestamp: Date.now()
        };
        await saveWebViewState(currentState);

        if (url === "https://auth.riotgames.com/logout") {
            try {
                if (webViewRef.current) {
                    // @ts-ignore
                    webViewRef.current?.stopLoading();
                }
            } catch (ignored) {
            }

            if (webViewRef.current) {
                webViewRef.current = null;
            }

            await logoutUser(username);
            navigation.navigate("Accounts");
        }
    }, [logoutUser, username, user, dispatch, navigation]);

    const initialUrl = "https://auth.riotgames.com/logout";

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.loadingOverlay}>
                <Loading />
            </View>
            <WebView
                ref={webViewRef}
                style={styles.hiddenWebView}
                onNavigationStateChange={handleNavigationStateChange}
                source={{ uri: savedState?.url || initialUrl }}
                sharedCookiesEnabled
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    hiddenWebView: {
        width: 0,
        height: 0,
        display: "none",
    },
});

export default React.memo(LogoutWebView);
