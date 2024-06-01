import axios, { AxiosResponse } from "axios";
import * as SecureStore from "expo-secure-store";

const authLogic = {
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

        const response: AxiosResponse<{ entitlements_token: string }> = await axios.request(options);
        const entitlementsToken: string = response.data?.entitlements_token;

        if (!entitlementsToken) throw new Error("Entitlements token not found");

        await SecureStore.setItemAsync("entitlements_token", entitlementsToken);
    },
};

export default authLogic;
