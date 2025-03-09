import axios, { AxiosResponse } from "axios";
// utils
import secureStore from "@/utils/secure-store";

const authLogic = {
    getEntitlement: async (): Promise<undefined> => {
        const accessToken = await secureStore.getItem("access_token");

        if (!accessToken) {
            throw new Error("Access token not found");
        }

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

        await secureStore.setItem("entitlements_token", entitlementsToken);
    },
};

export default authLogic;
