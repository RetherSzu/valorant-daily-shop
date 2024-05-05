import * as SecureStore from "expo-secure-store";

const keys = [
    "username",
    "password",
    "stay_sign_in",
    "access_token",
    "is_token",
    "entitlements_token",
    "sub",
    "tdid",
    "asid",
    "clid",
    "ssid",
    "game_name",
    "tag_line",
    "balance",
    "shop",
    "offers",
    "pp",
    "riot_version",
    "radianite_point",
    "valorant_point",
    "kingdom_credit",
];

export const clearSecureStore = async () => {
    for (const key of keys) {
        await SecureStore.deleteItemAsync(key);
    }
};
