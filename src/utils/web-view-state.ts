import AsyncStorage from '@react-native-async-storage/async-storage';

export interface WebViewState {
    url: string;
    cookies?: string;
    scrollPosition?: number;
    formData?: Record<string, any>;
    timestamp: number;
}

const WEBVIEW_STATE_KEY = '@webview_state';

export const saveWebViewState = async (state: WebViewState): Promise<void> => {
    try {
        const existingState = await AsyncStorage.getItem(WEBVIEW_STATE_KEY);
        const states = existingState ? JSON.parse(existingState) : {};
        
        // Save state with timestamp
        states[state.url] = {
            ...state,
            timestamp: Date.now()
        };
        
        await AsyncStorage.setItem(WEBVIEW_STATE_KEY, JSON.stringify(states));
    } catch (error) {
        console.error('Error saving WebView state:', error);
    }
};

export const getWebViewState = async (url: string): Promise<WebViewState | null> => {
    try {
        const state = await AsyncStorage.getItem(WEBVIEW_STATE_KEY);
        if (!state) return null;
        
        const states = JSON.parse(state);
        return states[url] || null;
    } catch (error) {
        console.error('Error getting WebView state:', error);
        return null;
    }
};

export const clearWebViewState = async (url?: string): Promise<void> => {
    try {
        if (url) {
            const state = await AsyncStorage.getItem(WEBVIEW_STATE_KEY);
            if (state) {
                const states = JSON.parse(state);
                delete states[url];
                await AsyncStorage.setItem(WEBVIEW_STATE_KEY, JSON.stringify(states));
            }
        } else {
            await AsyncStorage.removeItem(WEBVIEW_STATE_KEY);
        }
    } catch (error) {
        console.error('Error clearing WebView state:', error);
    }
}; 