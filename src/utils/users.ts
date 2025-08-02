import AsyncStorage from "@react-native-async-storage/async-storage";
// types
import { IUserData, IUsersData } from "@/types/context/user";
// utils
import secureStore from "@/utils/secure-store";

// const
const newUser = {
    stay_sign_in: "",
    access_token: "",
    id_token: "",
    entitlements_token: "",
    sub: "",
    tdid: "",
    asid: "",
    clid: "",
    ssid: "",
    game_name: "",
    tag_line: "",
    pp: "",
    radianite_point: "",
    valorant_point: "",
    kingdom_credit: "",
    logged: false,
    rank: "",
    rr: "",
    level: "",
    xp: "",
    player_card_id: "",
};

const user = {
    async getUserInfo(key: keyof IUserData): Promise<string | null | boolean> {
        const currentUser = await AsyncStorage.getItem("current_user");

        if (!currentUser) {
            return false;
        }

        const users = await secureStore.getItem("users");

        if (!users) {
            return "";
        }

        const usersData: IUsersData = JSON.parse(users);

        if (usersData && usersData[currentUser] && usersData[currentUser][key]) {
            return usersData[currentUser][key];
        }
        return "";
    },

    async removeUser(userKey: string): Promise<void> {
        const users = await secureStore.getItem("users");

        if (!users) {
            return;
        }

        const usersData: IUsersData = JSON.parse(users);

        if (usersData && usersData[userKey]) {
            delete usersData[userKey];
            await secureStore.setItem("users", JSON.stringify(usersData));
        }
    },

    async setUserInfo(key: keyof IUserData, value: string | boolean): Promise<void> {
        const currentUser = await AsyncStorage.getItem("current_user");

        if (!currentUser) {
            return;
        }

        const users = await secureStore.getItem("users");

        if (!users) {
            const usersData: IUsersData = {};
            usersData[currentUser] = newUser;
            // @ts-ignore
            usersData[currentUser][key] = value;
            await secureStore.setItem("users", JSON.stringify(usersData));
            return;
        }

        const usersData: IUsersData = JSON.parse(users);

        if (!usersData[currentUser]) {
            usersData[currentUser] = newUser;
        }

        // @ts-ignore
        usersData[currentUser][key] = value;
        await secureStore.setItem("users", JSON.stringify(usersData));
    },

    async getAllUsers(): Promise<IUsersData> {
        const users = await secureStore.getItem("users");

        if (!users) {
            console.log("No users found");
            return {};
        }

        return JSON.parse(users);
    },
};


export default user;