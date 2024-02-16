import axios from "axios";
import * as SecureStore from "expo-secure-store";

// ----------------------------------------------------------------------

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            console.log("401 error");
            await SecureStore.deleteItemAsync("username");
            await SecureStore.deleteItemAsync("password");
            await SecureStore.deleteItemAsync("stay_sign_in");
            await SecureStore.deleteItemAsync("access_token");
            await SecureStore.deleteItemAsync("entitlements_token");
            await SecureStore.deleteItemAsync("sub");
            await SecureStore.deleteItemAsync("tdid");
            await SecureStore.deleteItemAsync("asid");
            await SecureStore.deleteItemAsync("clid");
            await SecureStore.deleteItemAsync("ssid");
        }
        Promise.reject((error.response && error.response.data) || "Something went wrong");
    }
);
export default axiosInstance;
