import { View } from "react-native";
import { Text } from "react-native-paper";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// context
import { useThemeContext } from "@/context/hook/use-theme-context";
// screen
import DayliShop from "@/screen/shop/daily-shop";

const Tab = createMaterialTopTabNavigator();

const Store = () => {

    const { colors } = useThemeContext();

    const tabNavigatorOptions = {
        initialRouteName: "Offers",
        screenOptions: {
            swipeEnabled: false,
            tabBarGap: 8,
            tabBarItemStyle: {
                width: 100,
                minWidth: 100,
                paddingHorizontal: 0
            },
            tabBarStyle: {
                backgroundColor: "#1B1D21",
                paddingLeft: 8
            },
            tabBarLabelStyle: {
                fontSize: 16,
                letterSpacing: .5,
                lineHeight: 24,
                marginHorizontal: 0
            },
            tabBarScrollEnabled: true,
            tabBarActiveTintColor: colors.text,
            tabBarInactiveTintColor: "#7B7D80",
            tabBarIndicatorStyle: {
                backgroundColor: colors.primary,
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50
            },
            tabBarIndicatorContainerStyle: {
                marginLeft: 8
            }
        }
    };

    return (
        <View className="flex-1" style={{ gap: 8, marginHorizontal: 16 }}>
            <Text variant="displaySmall" style={{ color: colors.text, fontFamily: "DrukWide" }}>STORE</Text>
            <Tab.Navigator {...tabNavigatorOptions}>
                <Tab.Screen name="Offers" component={DayliShop} />
            </Tab.Navigator>
        </View>
    );
};

export default Store;
