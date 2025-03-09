import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// types
import { OwnedItem } from "@/types/api/owned-items";
import { StorefrontResponse } from "@/types/api/shop";
import { FavoriteSkin } from "@/types/api/favorite-skin";
import { WalletResponse } from "@/types/api/user-balance";
import { AccountXPResponse } from "@/types/api/account-xp";
import { PlayerInfoResponse } from "@/types/api/auth/user-info";
import { PlayerLoadoutGun, PlayerLoadoutResponse } from "@/types/api/player-loadout";
// utils
import user from "@/utils/users";
import secureStore from "@/utils/secure-store";

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
        const accessToken = await secureStore.getItem("access_token");
        const options = {
            method: "GET",
            url: "https://auth.riotgames.com/userinfo",
            headers: { Authorization: `Bearer ${accessToken}` },
        };

        const response: AxiosResponse<PlayerInfoResponse> = await requestWithHeaders(options);

        // Save the user's game name and tag line to the device's storage
        if (response.data.acct.game_name && response.data.acct.tag_line && response.data.sub) {
            await AsyncStorage.setItem("current_user", response.data.acct.game_name + "#" + response.data.acct.tag_line);
            await user.setUserInfo("game_name", response.data.acct.game_name);
            await user.setUserInfo("tag_line", response.data.acct.tag_line);
            await user.setUserInfo("sub", response.data.sub);


            const accessToken = await secureStore.getItem("access_token");
            if (accessToken) {
                await user.setUserInfo("access_token", accessToken);
            }

            const idToken = await secureStore.getItem("id_token");
            if (idToken) {
                await user.setUserInfo("id_token", idToken);
            }

            const entitlementsToken = await secureStore.getItem("entitlements_token");
            if (entitlementsToken) {
                await user.setUserInfo("entitlements_token", entitlementsToken);
            }
        }
    },

    getRiotGeo: async (): Promise<void> => {
        const [accessToken, idToken] = await Promise.all([
            user.getUserInfo("access_token"),
            user.getUserInfo("id_token"),
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

        await user.setUserInfo("pp", response.data.affinities.live);
    },

    getRiotVersion: async (): Promise<void> => {
        const options = {
            method: "GET",
            url: "https://valorant-api.com/v1/version",
        };

        const response = await requestWithHeaders(options);
        await secureStore.setItem("riot_version", response.data.data.riotClientVersion);
    },

    getUserBalance: async (): Promise<void> => {
        const [accessToken, entitlementsToken, sub, pp, riotVersion] = await Promise.all([
            user.getUserInfo("access_token"),
            user.getUserInfo("entitlements_token"),
            user.getUserInfo("sub"),
            user.getUserInfo("pp"),
            secureStore.getItem("riot_version"),
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

        await user.setUserInfo("radianite_point", balance.radianitePoint);
        await user.setUserInfo("valorant_point", balance.valorantPoint);
        await user.setUserInfo("kingdom_credit", balance.kingdomCredit);
    },

    getFrontShop: async () => {
        const [accessToken, entitlementsToken, sub, pp, riotVersion] = await Promise.all([
            user.getUserInfo("access_token"),
            user.getUserInfo("entitlements_token"),
            user.getUserInfo("sub"),
            user.getUserInfo("pp"),
            secureStore.getItem("riot_version"),
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
            user.getUserInfo("access_token"),
            user.getUserInfo("entitlements_token"),
            user.getUserInfo("sub"),
            user.getUserInfo("pp"),
            secureStore.getItem("riot_version"),
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

        await user.setUserInfo("level", response.data.Progress.Level.toString());
        await user.setUserInfo("xp", response.data.Progress.XP.toString());
    },

    getPlayerLoadout: async () => {
        const [accessToken, entitlementsToken, sub, pp, riotVersion] = await Promise.all([
            user.getUserInfo("access_token"),
            user.getUserInfo("entitlements_token"),
            user.getUserInfo("sub"),
            user.getUserInfo("pp"),
            secureStore.getItem("riot_version"),
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
        await user.setUserInfo("player_card_id", response.data.Identity.PlayerCardID);
        return response.data;
    },

    getPlayerRankAndRR: async () => {
        const [gameName, tagLine, pp] = await Promise.all([
            user.getUserInfo("game_name"),
            user.getUserInfo("tag_line"),
            user.getUserInfo("pp"),
        ]);

        const options = {
            method: "GET",
            url: `https://api.kyroskoh.xyz/valorant/v1/mmr/${pp}/${gameName}/${tagLine}`,
        };

        try {
            const response: AxiosResponse = await axios.request(options);

            if (response.data) {
                await user.setUserInfo("rank", response.data.split(" - ")[0]);
                await user.setUserInfo("rr", response.data.split(" - ")[1].split("RR")[0]);
            }
        } catch {
        }
    },

    getOwnedItems: async (itemTypeId: string) => {
        const [accessToken, entitlementsToken, sub, pp, riotVersion] = await Promise.all([
            user.getUserInfo("access_token"),
            user.getUserInfo("entitlements_token"),
            user.getUserInfo("sub"),
            user.getUserInfo("pp"),
            secureStore.getItem("riot_version"),
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
            user.getUserInfo("access_token"),
            user.getUserInfo("entitlements_token"),
            user.getUserInfo("sub"),
            user.getUserInfo("pp"),
            secureStore.getItem("riot_version"),
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
            user.getUserInfo("access_token"),
            user.getUserInfo("entitlements_token"),
            user.getUserInfo("sub"),
            user.getUserInfo("pp"),
            secureStore.getItem("riot_version"),
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
            user.getUserInfo("access_token"),
            user.getUserInfo("entitlements_token"),
            user.getUserInfo("sub"),
            user.getUserInfo("pp"),
            secureStore.getItem("riot_version"),
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
            user.getUserInfo("access_token"),
            user.getUserInfo("entitlements_token"),
            user.getUserInfo("sub"),
            user.getUserInfo("pp"),
            secureStore.getItem("riot_version"),
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
    },
};

export default valorantProvider;
