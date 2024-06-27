import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// components
import Text from "@/components/typography/text";
// contexts
import useUserContext from "@/contexts/hook/use-user-context";
import useThemeContext from "@/contexts/hook/use-theme-context";
// screens
import AgentsView from "@/screens/profile/agents/agents-view";
import CollectionView from "@/screens/profile/collection/collection-view";

const Tab = createMaterialTopTabNavigator();

const ProfileScreen = () => {

    const { gameName, tagLine } = useUserContext();

    const { colors } = useThemeContext();

    const tabNavigatorOptions = useMemo(() => ({
        initialRouteName: "Collections",
        screenOptions: {
            swipeEnabled: false,
            tabBarGap: 8,
            tabBarItemStyle: styles.tabBarItem,
            tabBarStyle: styles.tabBar,
            tabBarLabelStyle: styles.tabBarLabel,
            tabBarScrollEnabled: true,
            tabBarActiveTintColor: colors.text,
            tabBarInactiveTintColor: "#7B7D80",
            tabBarIndicatorStyle: {
                backgroundColor: colors.primary,
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
            },
            tabBarIndicatorContainerStyle: {
                marginLeft: 8,
            },
            lazy: true,  // Enable lazy loading
        },
    }), []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text variant="displayMedium" style={styles.displayText}>PROFILE</Text>
                {gameName && tagLine && (
                    <Text variant="titleSmall" style={styles.userInfo}>
                        {gameName} #{tagLine}
                    </Text>
                )}
            </View>
            <Tab.Navigator {...tabNavigatorOptions}>
                <Tab.Screen name="Collection" component={CollectionView} />
                <Tab.Screen name="Agents" component={AgentsView} />
            </Tab.Navigator>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1B1D21",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
    },
    displayText: {
        fontFamily: "Vandchrome",
    },
    userInfo: {
        opacity: 0.5,
    },
    tabBarItem: {
        width: "auto",
        minWidth: 110,
        paddingHorizontal: 4,
    },
    tabBar: {
        backgroundColor: "#1B1D21",
        paddingHorizontal: 8,
    },
    tabBarLabel: {
        fontSize: 16,
        letterSpacing: 0.5,
        lineHeight: 24,
        marginHorizontal: 0,
        fontFamily: "Nota",
    },
});

export default React.memo(ProfileScreen);
