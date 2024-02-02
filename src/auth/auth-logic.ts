import axios, { AxiosError, AxiosResponse } from "axios";
import * as SecureStore from "expo-secure-store";

const authLogic = {
    authCookie: async (): Promise<{
        tdid: string;
        asid: string;
        clid: string;
        ssid: string;
    }> => {
        console.log("authCookie");

        const cookies: {
            tdid: string;
            asid: string;
            clid: string;
            ssid: string;
        } = {
            "tdid": "",
            "asid": "",
            "clid": "",
            "ssid": ""
        };

        try {
            const options = {
                method: "POST",
                url: "https://auth.riotgames.com/api/v1/authorization",
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    client_id: "play-valorant-web-prod",
                    nonce: "1",
                    redirect_uri: "https://playvalorant.com/opt_in",
                    response_type: "token id_token",
                    scope: "account openid"
                }
            };

            const response = await axios.request(options);

            const setCookie = response.headers["set-cookie"];

            if (!setCookie || setCookie?.length === 0) throw new Error("No cookies found");

            setCookie[0].split(",").forEach(cookie => {
                const [key, value] = cookie.split("=");
                if (Object.keys(cookies).includes(key.trim())) {
                    cookies[key.trim() as "ssid"] = value.split(";")[0].trim();
                }
            });

            for (const [key, value] of Object.entries(cookies)) {
                console.log("\x1B[33m", key, "\x1B[0m", value);
                SecureStore.setItem(key, value as string);
            }
        } catch (error) {
            console.error(error);
        }
        return cookies;
    },

    getToken: async (username: string, password: string): Promise<string | undefined> => {
        console.log("getToken");
        const [tdid, asid, clid] = await Promise.all([
            SecureStore.getItemAsync("tdid"),
            SecureStore.getItemAsync("asid"),
            SecureStore.getItemAsync("clid")
        ]);

        const options = {
            method: "PUT",
            url: "https://auth.riotgames.com/api/v1/authorization",
            headers: {
                cookie: `${tdid};${asid};${clid}`,
                "Content-Type": "application/json"
            },
            data: {
                type: "auth",
                username: username,
                password: password,
                remember: true,
                language: "en_US"
            }
        };

        try {
            const response = await axios.request(options);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },

    cookieReauth: async (): Promise<undefined> => {
        console.log("cookieReauth");

        const [tdid, asid, clid, ssid] = await Promise.all([
            SecureStore.getItemAsync("tdid"),
            SecureStore.getItemAsync("asid"),
            SecureStore.getItemAsync("clid"),
            SecureStore.getItemAsync("ssid")
        ]);

        const options = {
            method: "GET",
            url: "https://auth.riotgames.com/authorize",
            params: {
                client_id: "play-valorant-web-prod",
                nonce: "1",
                redirect_uri: "https://playvalorant.com/opt_in",
                response_type: "token id_token",
                scope: "account openid"
            },
            headers: {
                cookie: `${tdid};${asid};${clid}:${ssid}`
            }
        };

        try {
            await axios.request(options);
        } catch (err) {
            const error = err as AxiosError;
            // Get access token in url
            const tokenMatch = error.response?.request["responseURL"].match(/access_token=([^&]*)/);
            if (tokenMatch) {
                SecureStore.setItem("access_token", tokenMatch[1]);
                return tokenMatch[1];
            }
        }
    },

    getEntitlement: async (): Promise<undefined> => {
        console.log("getEntitlement");

        const accessToken = await SecureStore.getItemAsync("access_token");

        const options = {
            method: "POST",
            url: "https://entitlements.auth.riotgames.com/api/token/v1",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                Authorization: "Bearer " + accessToken
            },
            data: {}
        };

        try {
            const response: AxiosResponse<{ entitlements_token: string }> = await axios.request(options);
            const entitlementsToken: string = response.data?.entitlements_token;

            if (!entitlementsToken) throw new Error("Entitlements token not found");

            await SecureStore.setItemAsync("entitlements_token", entitlementsToken);
        } catch (error) {
            console.log(error);
        }
    }
};

export default authLogic;
