import { View } from "react-native";
import React, { useRef } from "react";
import { WebView } from "react-native-webview";
import { WebViewNativeEvent } from "react-native-webview/lib/WebViewTypes";
// components
import Loading from "@/components/loading/loading";
// contexts
import useAuthContext from "@/contexts/hook/use-auth-context";
import useThemeContext from "@/contexts/hook/use-theme-context";

const LogoutWebView = () => {

    const webViewRef = useRef(null);

    const { logout } = useAuthContext();

    const { colors } = useThemeContext();

    const handleNavigationStateChange = async (event: WebViewNativeEvent) => {
        if (event.url === "https://auth.riotgames.com/logout") {
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
            await logout();
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <View
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            >
                <Loading />
            </View>
            <WebView
                ref={webViewRef}
                style={{
                    width: 0,
                    height: 0,
                    display: "none",
                }}
                onNavigationStateChange={handleNavigationStateChange}
                source={{ uri: "https://auth.riotgames.com/logout" }}
            />
        </View>
    );
};

export default LogoutWebView;
