import * as SecureStore from "expo-secure-store";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
// types
import { OwnedItem } from "@/types/api/owned-items";
import { StorefrontResponse } from "@/types/api/shop";
import { FavoriteSkin } from "@/types/api/favorite-skin";
import { WalletResponse } from "@/types/api/user-balance";
import { AccountXPResponse } from "@/types/api/account-xp";
import { PlayerInfoResponse } from "@/types/api/auth/user-info";
import { PlayerLoadoutGun, PlayerLoadoutResponse } from "@/types/api/player-loadout";

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
            method: "POST",
            url: `https://pd.${pp}.a.pvp.net/store/v3/storefront/${sub}`,
            data: "{}",
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
                plugins: response.data.PluginStores,
                bundles: response.data.FeaturedBundle,
                offers: response.data.SkinsPanelLayout,
                nightMarket: response.data?.BonusStore,
                accessoryStore: response.data.AccessoryStore,
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

    getAccountXP: async () => {
        const [accessToken, entitlementsToken, sub, pp, riotVersion] = await Promise.all([
            SecureStore.getItemAsync("access_token"),
            SecureStore.getItemAsync("entitlements_token"),
            SecureStore.getItemAsync("sub"),
            SecureStore.getItemAsync("pp"),
            SecureStore.getItemAsync("riot_version"),
        ]);

        const options = {
            method: "GET",
            url: `https://pd.${pp}.a.pvp.net/account-xp/v1/players/${sub}`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "X-Riot-Entitlements-JWT": `${entitlementsToken}`,
                "X-Riot-ClientPlatform": X_Riot_ClientPlatform,
                "X-Riot-ClientVersion": riotVersion,
            },
        };

        const response: AxiosResponse<AccountXPResponse> = await axios.request(options);

        return response.data;
    },

    getPlayerLoadout: async () => {
        const [accessToken, entitlementsToken, sub, pp, riotVersion] = await Promise.all([
            SecureStore.getItemAsync("access_token"),
            SecureStore.getItemAsync("entitlements_token"),
            SecureStore.getItemAsync("sub"),
            SecureStore.getItemAsync("pp"),
            SecureStore.getItemAsync("riot_version"),
        ]);

        const options = {
            method: "GET",
            url: `https://pd.${pp}.a.pvp.net/personalization/v2/players/${sub}/playerloadout`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "X-Riot-Entitlements-JWT": `${entitlementsToken}`,
                "X-Riot-ClientPlatform": X_Riot_ClientPlatform,
                "X-Riot-ClientVersion": riotVersion,
            },
        };

        const response: AxiosResponse<PlayerLoadoutResponse> = await requestWithHeaders(options);

        return response.data;
    },

    getRank: async () => {
        const [gameName, tagLine, pp] = await Promise.all([
            SecureStore.getItemAsync("game_name"),
            SecureStore.getItemAsync("tag_line"),
            SecureStore.getItemAsync("pp"),
        ]);

        const options = {
            method: "GET",
            url: `https://api.kyroskoh.xyz/valorant/v1/mmr/${pp}/${gameName}/${tagLine}`,
        };

        try {
            const response: AxiosResponse = await axios.request(options);

            if (response.data) {
                return {
                    rank: response.data.split(" - ")[0],
                    rr: response.data.split(" - ")[1].split("RR")[0],
                };
            }
        } catch {
        }

        return { rank: "Unranked", rr: "0" };
    },

    getOwnedItems: async (itemTypeId: string) => {
        const [accessToken, entitlementsToken, sub, pp, riotVersion] = await Promise.all([
            SecureStore.getItemAsync("access_token"),
            SecureStore.getItemAsync("entitlements_token"),
            SecureStore.getItemAsync("sub"),
            SecureStore.getItemAsync("pp"),
            SecureStore.getItemAsync("riot_version"),
        ]);

        const options = {
            method: "GET",
            url: `https://pd.${pp}.a.pvp.net/store/v1/entitlements/${sub}/${itemTypeId}`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "X-Riot-Entitlements-JWT": `${entitlementsToken}`,
                "X-Riot-ClientPlatform": X_Riot_ClientPlatform,
                "X-Riot-ClientVersion": riotVersion,
            },
        };

        const response: AxiosResponse<OwnedItem> = await requestWithHeaders(options);

        return response.data;
    },

    setPlayerLoadout: async (playerLoadout: PlayerLoadoutResponse, ID: string, skinID: string, skinLevelID: string, chromaID: string) => {
        const [accessToken, entitlementsToken, sub, pp, riotVersion] = await Promise.all([
            SecureStore.getItemAsync("access_token"),
            SecureStore.getItemAsync("entitlements_token"),
            SecureStore.getItemAsync("sub"),
            SecureStore.getItemAsync("pp"),
            SecureStore.getItemAsync("riot_version"),
        ]);

        // @ts-ignore
        delete playerLoadout["Subject"];
        // @ts-ignore
        delete playerLoadout["Version"];

        const options = {
            method: "PUT",
            url: `https://pd.${pp}.a.pvp.net/personalization/v2/players/${sub}/playerloadout`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "X-Riot-Entitlements-JWT": `${entitlementsToken}`,
                "X-Riot-ClientPlatform": X_Riot_ClientPlatform,
                "X-Riot-ClientVersion": riotVersion,
            },
            data: {
                ...playerLoadout,
                Guns: [
                    ...playerLoadout.Guns.map((gun: PlayerLoadoutGun) => {
                        if (gun.ID === ID) {
                            return {
                                ID: ID,
                                SkinID: skinID,
                                SkinLevelID: skinLevelID,
                                ChromaID: chromaID,
                                Attachments: [],
                            };
                        }
                        return gun;
                    }),
                ],
            },
        };

        const response: AxiosResponse<PlayerLoadoutResponse> = await requestWithHeaders(options);

        return response.data;
    },

    getPlayerFavoriteSkin: async () => {
        const [accessToken, entitlementsToken, sub, pp, riotVersion] = await Promise.all([
            SecureStore.getItemAsync("access_token"),
            SecureStore.getItemAsync("entitlements_token"),
            SecureStore.getItemAsync("sub"),
            SecureStore.getItemAsync("pp"),
            SecureStore.getItemAsync("riot_version"),
        ]);

        const options = {
            method: "GET",
            url: `https://pd.${pp}.a.pvp.net/favorites/v1/players/${sub}/favorites`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "X-Riot-Entitlements-JWT": `${entitlementsToken}`,
                "X-Riot-ClientPlatform": X_Riot_ClientPlatform,
                "X-Riot-ClientVersion": riotVersion,
            },
        };

        const response: AxiosResponse<FavoriteSkin> = await requestWithHeaders(options);

        return response.data;
    },

    addPlayerFavoriteSkin: async (itemID: string) => {
        const [accessToken, entitlementsToken, sub, pp, riotVersion] = await Promise.all([
            SecureStore.getItemAsync("access_token"),
            SecureStore.getItemAsync("entitlements_token"),
            SecureStore.getItemAsync("sub"),
            SecureStore.getItemAsync("pp"),
            SecureStore.getItemAsync("riot_version"),
        ]);

        const options = {
            method: "POST",
            url: `https://pd.${pp}.a.pvp.net/favorites/v1/players/${sub}/favorites`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "X-Riot-Entitlements-JWT": `${entitlementsToken}`,
                "X-Riot-ClientPlatform": X_Riot_ClientPlatform,
                "X-Riot-ClientVersion": riotVersion,
            },
            data: {
                ItemID: itemID,
            },
        };

        const response: AxiosResponse = await requestWithHeaders(options);

        return response.data;
    },

    deletePlayerFavoriteSkin: async (itemID: string) => {
        const [accessToken, entitlementsToken, sub, pp, riotVersion] = await Promise.all([
            SecureStore.getItemAsync("access_token"),
            SecureStore.getItemAsync("entitlements_token"),
            SecureStore.getItemAsync("sub"),
            SecureStore.getItemAsync("pp"),
            SecureStore.getItemAsync("riot_version"),
        ]);

        const options = {
            method: "DELETE",
            url: `https://pd.${pp}.a.pvp.net/favorites/v1/players/${sub}/favorites/${itemID.replace(/-/g, "")}`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "X-Riot-Entitlements-JWT": `${entitlementsToken}`,
                "X-Riot-ClientPlatform": X_Riot_ClientPlatform,
                "X-Riot-ClientVersion": riotVersion,
            },
        };

        const response: AxiosResponse = await requestWithHeaders(options);

        return response.data;
    }
};

export default valorantProvider;
