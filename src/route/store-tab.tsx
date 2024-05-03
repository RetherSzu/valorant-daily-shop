import React, { useState } from "react";
import { BottomNavigation } from "react-native-paper";
// component
import SvgShop from "@/component/icon/shop";
import SvgSetting from "@/component/icon/setting";
// context
import useThemeContext from "@/context/hook/use-theme-context";
// route
import Header from "@/route/navigation/header";
import StoreStackScreen from "@/route/store-stack-screen";
// screen
import Settings from "@/screen/settings";

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
