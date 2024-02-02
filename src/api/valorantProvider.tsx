import * as SecureStore from "expo-secure-store";
import axios, { AxiosRequestConfig } from "axios";

// ----------------------------------------------------------------------

const requestWithHeaders = async (options: AxiosRequestConfig<any>) => {
    try {
        return await axios.request(options);
    } catch (error) {
        console.error(`Error in ${options.url}:`, error);
        throw error;
    }
};

// ----------------------------------------------------------------------

const valorantProvider = {
    getUserInfo: async () => {
        const accessToken = await SecureStore.getItemAsync("access_token");
        const options = {
            method: "GET",
            url: "https://auth.riotgames.com/userinfo",
            headers: { Authorization: `Bearer ${accessToken}` }
        };

        const response = await requestWithHeaders(options);

        if (response.data?.sub) {
            await SecureStore.setItemAsync("sub", response.data.sub);
        }
    },

    getUserWallet: async () => {
        const [accessToken, entitlementsToken, sub] = await Promise.all([
            SecureStore.getItemAsync("access_token"),
            SecureStore.getItemAsync("entitlements_token"),
            SecureStore.getItemAsync("sub")
        ]);

        const options = {
            method: "GET",
            url: `https://pd.eu.a.pvp.net/store/v1/wallet/${sub}`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "X-Riot-Entitlements-JWT": ` ${entitlementsToken}`
            }
        };

        const response =  await requestWithHeaders(options);
        console.log(JSON.stringify(response.data, null, 4));
    }
};

export default valorantProvider;
