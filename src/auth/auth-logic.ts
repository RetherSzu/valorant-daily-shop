import * as SecureStore from "expo-secure-store";
import axios, { AxiosError, AxiosResponse } from "axios";
// utils
import axiosInstance from "@/utils/axios";

const authLogic = {
    authCookie: async (): Promise<{
        tdid: string;
        asid: string;
        clid: string;
        ssid: string;
    }> => {

        const cookies: {
            tdid: string;
            asid: string;
            clid: string;
            ssid: string;
        } = {
            "tdid": "",
            "asid": "",
            "clid": "",
            "ssid": "",
        };

        try {
            const options = {
                method: "POST",
                url: "https://auth.riotgames.com/api/v1/authorization",
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    client_id: "play-valorant-web-prod",
                    nonce: "1",
                    redirect_uri: "https://playvalorant.com/opt_in",
                    response_type: "token id_token",
                    scope: "account openid",
                },
            };

            const response = await axiosInstance.request(options);

            const setCookie = response.headers["set-cookie"];

            if (!setCookie || setCookie?.length === 0) throw new Error("No cookies found");

            setCookie[0].split(",").forEach(cookie => {
                const [key, value] = cookie.split("=");
                if (Object.keys(cookies).includes(key.trim())) {
                    cookies[key.trim() as "ssid"] = value.split(";")[0].trim();
                }
            });

            for (const [key, value] of Object.entries(cookies)) {
                SecureStore.setItem(key, value as string);
            }
        } catch (error) {
            console.error("authCookie", error);
            throw error;
        }
        return cookies;
    },

    getToken: async (username: string, password: string): Promise<boolean> => {
        const [tdid, asid, clid] = await Promise.all([
            SecureStore.getItemAsync("tdid"),
            SecureStore.getItemAsync("asid"),
            SecureStore.getItemAsync("clid"),
        ]);

        const options = {
            method: "PUT",
            url: "https://auth.riotgames.com/api/v1/authorization",
            headers: {
                cookie: `${tdid};${asid};${clid}`,
                "Content-Type": "application/json",
            },
            data: {
                type: "auth",
                username: username,
                password: password,
                remember: false,
                language: "en_US",
            },
        };

        try {
            const response = await axiosInstance.request(options);

            if (response.data.type === "multifactor") {
                return true;
            }

            const hash = response.data.response.parameters.uri.split("#")[1];
            const params = new URLSearchParams(hash);

            const access_token = params.get("access_token");
            const id_token = params.get("id_token");

            if (access_token && id_token) {
                SecureStore.setItem("access_token", access_token);
                SecureStore.setItem("id_token", id_token);
            }
        } catch (error) {
            throw new AxiosError("Invalid username or password");
        }
        return false;
    },

    cookieReauth: async (): Promise<undefined> => {
        const ssid = await SecureStore.getItemAsync("ssid");

        const options = {
            method: "GET",
            url: "https://auth.riotgames.com/authorize",
            params: {
                client_id: "play-valorant-web-prod",
                nonce: "1",
                redirect_uri: "https://playvalorant.com/opt_in",
                response_type: "token id_token",
                scope: "account openid",
            },
            headers: {
                cookie: ssid,
            },
        };

        try {
            await axios.request(options);
        } catch (err) {
            const error = err as AxiosError;
            // Get access token in url
            const hash = error.response?.request["responseURL"].split("#")[1];
            const params = new URLSearchParams(hash);

            const access_token = params.get("access_token");
            const id_token = params.get("id_token");

            if (access_token && id_token) {
                SecureStore.setItem("access_token", access_token);
                SecureStore.setItem("id_token", id_token);
                return;
            }
            throw error;
        }
    },

    getEntitlement: async (): Promise<undefined> => {
        const accessToken = await SecureStore.getItemAsync("access_token");

        const options = {
            method: "POST",
            url: "https://entitlements.auth.riotgames.com/api/token/v1",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                Authorization: "Bearer " + accessToken,
            },
            data: {},
        };

        try {
            const response: AxiosResponse<{ entitlements_token: string }> = await axios.request(options);
            const entitlementsToken: string = response.data?.entitlements_token;

            if (!entitlementsToken) throw new Error("Entitlements token not found");

            await SecureStore.setItemAsync("entitlements_token", entitlementsToken);
        } catch (error) {
            throw error;
        }
    },

    async multifactor(code: string): Promise<boolean> {

        const [tdid, asid, clid] = await Promise.all([
            SecureStore.getItemAsync("tdid"),
            SecureStore.getItemAsync("asid"),
            SecureStore.getItemAsync("clid"),
        ]);

        const options = {
            url: "https://auth.riotgames.com/api/v1/authorization",
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                cookie: `${tdid};${asid};${clid}`,
            },
            data: {
                type: "multifactor",
                code: code,
                rememberDevice: true,
            },
        };

        try {
            const response = await axios.request(options);
            const responseURL = response.data.response.parameters.uri;
            const tokenMatch = responseURL.match(/access_token=([^&]*)/);

            if (tokenMatch) {
                await SecureStore.setItemAsync("access_token", tokenMatch[1]);
                return true;
            }
        } catch (error) {
            console.error(error);
        }
        return false;
    },
};

export default authLogic;
