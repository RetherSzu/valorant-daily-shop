import React, { useState } from "react";
import { BottomNavigation } from "react-native-paper";
// components
import SvgShop from "@/components/icon/shop";
import SvgSetting from "@/components/icon/setting";
// contexts
import useThemeContext from "@/contexts/hook/use-theme-context";
// routes
import Header from "@/routes/navigation/header";
import StoreStackScreen from "@/routes/store-stack-screen";
// screens
import Settings from "@/screens/settings";

const StoreTab = () => {

    const [index, setIndex] = useState(0);

    const [routes] = React.useState([
        { key: "shop", focusedIcon: SvgShop },
        { key: "settings", focusedIcon: SvgSetting },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        shop: StoreStackScreen,
        settings: Settings,
    });

    const { colors } = useThemeContext();

    return (
        <>
            <Header />
            <BottomNavigation
                labeled={false}
                sceneAnimationEnabled
                inactiveColor="#7A7B7E"
                onIndexChange={setIndex}
                renderScene={renderScene}
                activeColor={colors.primary}
                sceneAnimationType="shifting"
                activeIndicatorStyle={{
                    width: 48,
                    height: 48,
                    padding: 8,
                    borderRadius: 50,
                    backgroundColor: colors.card,
                }}
                navigationState={{ index, routes }}
                style={{ backgroundColor: "#1B1D21" }}
                barStyle={{ backgroundColor: "#1B1D21", justifyContent: "center" }}
            />
        </>
    );
};

export default StoreTab;
