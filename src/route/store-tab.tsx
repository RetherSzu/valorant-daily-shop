import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// route
import BottomTabBar from "@/route/navigation/bottom-tab-bar";
// screen
import Home from "@/screen/home";
import Settings from "@/screen/settings";

const Tab = createBottomTabNavigator();

const StoreTab = () => {
    return (
        <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
            <Tab.Screen options={{ headerShown: false }} name="Store" component={Home} />
            <Tab.Screen options={{ headerShown: false }} name="Settings" component={Settings} />
        </Tab.Navigator>
    );
};

export default StoreTab;
