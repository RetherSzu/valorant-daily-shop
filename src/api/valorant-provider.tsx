import * as SecureStore from "expo-secure-store";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
// type
import { StorefrontResponse } from "@/type/api/shop";
import { WalletResponse } from "@/type/api/user-balance";
import { PlayerInfoResponse } from "@/type/api/auth/user-info";

// ----------------------------------------------------------------------

const X_Riot_ClientPlatform = "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9";

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
            headers: { Authorization: `Bearer ${accessToken}` },
        };

        const response: AxiosResponse<PlayerInfoResponse> = await requestWithHeaders(options);

        if (response.data.sub) {
            await SecureStore.setItemAsync("sub", response.data.sub);
        }

        if (response.data.acct.game_name) {
            await SecureStore.setItemAsync("game_name", response.data.acct.game_name);
        }

        if (response.data.acct.tag_line) {
            await SecureStore.setItemAsync("tag_line", response.data.acct.tag_line);
        }
    },

    getRiotGeo: async (): Promise<void> => {
        const [accessToken, idToken] = await Promise.all([
            SecureStore.getItemAsync("access_token"),
            SecureStore.getItemAsync("id_token"),
        ]);

        const options = {
            method: "PUT",
            url: "https://riot-geo.pas.si.riotgames.com/pas/v1/product/valorant",
            data: {
                id_token: idToken,
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await requestWithHeaders(options);

        await SecureStore.setItemAsync("pp", response.data.affinities.live);
    },

    getRiotVersion: async (): Promise<void> => {
        const options = {
            method: "GET",
            url: "https://valorant-api.com/v1/version",
        };

        const response = await requestWithHeaders(options);
        await SecureStore.setItemAsync("riot_version", response.data.data.riotClientVersion);
    },

    getUserBalance: async (): Promise<void> => {
        const [accessToken, entitlementsToken, sub, pp, riotVersion] = await Promise.all([
            SecureStore.getItemAsync("access_token"),
            SecureStore.getItemAsync("entitlements_token"),
            SecureStore.getItemAsync("sub"),
            SecureStore.getItemAsync("pp"),
            SecureStore.getItemAsync("riot_version"),
        ]);

        const options = {
            method: "GET",
            url: `https://pd.${pp}.a.pvp.net/store/v1/wallet/${sub}`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "X-Riot-Entitlements-JWT": `${entitlementsToken}`,
                "X-Riot-ClientPlatform": X_Riot_ClientPlatform,
                "X-Riot-ClientVersion": riotVersion,
            },
        };

        const response: AxiosResponse<WalletResponse> = await requestWithHeaders(options);

        const balance = {
            radianitePoint: response.data.Balances["e59aa87c-4cbf-517a-5983-6e81511be9b7"].toString(),
            valorantPoint: response.data.Balances["85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741"].toString(),
            kingdomCredit: response.data.Balances["85ca954a-41f2-ce94-9b45-8ca3dd39a00d"].toString(),
        };

        await SecureStore.setItemAsync("radianite_point", balance.radianitePoint);
        await SecureStore.setItemAsync("valorant_point", balance.valorantPoint);
        await SecureStore.setItemAsync("kingdom_credit", balance.kingdomCredit);
    },

    getFrontShop: async () => {
        const [accessToken, entitlementsToken, sub, pp, riotVersion] = await Promise.all([
            SecureStore.getItemAsync("access_token"),
            SecureStore.getItemAsync("entitlements_token"),
            SecureStore.getItemAsync("sub"),
            SecureStore.getItemAsync("pp"),
            SecureStore.getItemAsync("riot_version"),
        ]);

        const options = {
            method: "GET",
            url: `https://pd.${pp}.a.pvp.net/store/v2/storefront/${sub}`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "X-Riot-Entitlements-JWT": `${entitlementsToken}`,
                "X-Riot-ClientPlatform": X_Riot_ClientPlatform,
                "X-Riot-ClientVersion": riotVersion,
            },
        };

        const response: AxiosResponse<StorefrontResponse> = await axios.request(options);

        if (response.data.SkinsPanelLayout.SingleItemStoreOffers) {
            return {
                bundles: response.data.FeaturedBundle,
                offers: response.data.SkinsPanelLayout,
                nightMarket: response.data?.BonusStore,
                plugins: response.data.PluginStores,
            };
        }
    },

    getBundle: async (id: string) => {
        const options = {
            method: "GET",
            url: `https://valorant-api.com/v1/bundles/${id}`,
        };

        try {
            const response = await axios.request(options);
            return response.data.data;
        } catch (error) {
            console.error(error);
        }
    },
};

export default valorantProvider;
