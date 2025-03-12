import { FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
// contexts
import useAuthContext from "@/contexts/hook/use-auth-context";
// components
import UserItem from "@/components/account/user-item";
// types
import { IUsersData } from "@/types/context/user";
import { NavigationProp } from "@/types/router/navigation";
// utils
import user from "@/utils/users";
import secureStore from "@/utils/secure-store";

const UserList = () => {

    const [users, setUsers] = useState<IUsersData>({});

    const { login } = useAuthContext();

    const navigate = useNavigation<NavigationProp>();

    const handleLogout = useCallback((username: string) => navigate.navigate("Logout", { username }), [navigate]);

    const handleLogin = useCallback(async (username: string) => {
        await AsyncStorage.setItem("current_user", username);

        // Get entitlement token and the id token
        const access_token = await user.getUserInfo("access_token");
        const id_token = await user.getUserInfo("id_token");

        if (typeof access_token != "string" || typeof id_token != "string") {
            return;
        }

        await secureStore.setItem("access_token", access_token);
        await secureStore.setItem("id_token", id_token);
        await login();
    }, [navigate]);

    const handleRelogin = useCallback(() => navigate.navigate("Login"), [navigate]);

    useFocusEffect(
        useCallback(() => {
            setUsers({});
            user.getAllUsers().then((users: IUsersData) => {
                setUsers(users);
            });
        }, []),
    );

    return (
        <FlatList
            data={Object.keys(users)}
            style={{ flex: 2, padding: 16, gap: 16, marginBottom: 16 }}
            contentContainerStyle={{ gap: 16 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
                <UserItem
                    key={index}
                    user={users[item]}
                    index={index}
                    handleLogin={() => handleLogin(item)}
                    handleLogout={() => handleLogout(item)}
                    handleRelogin={handleRelogin}
                />
            )}
        />
    );
};

export default React.memo(UserList);