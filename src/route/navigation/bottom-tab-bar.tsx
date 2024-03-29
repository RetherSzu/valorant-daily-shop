import * as React from "react";
import { StyleSheet, View } from "react-native";
// context
import { useThemeContext } from "@/context/hook/use-theme-context";
// route
import IconTabBar from "@/route/navigation/icon-tab-bar";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const BottomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const iconTabBarName = ["Shop", "Setting"];

    const { colors } = useThemeContext();

    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;
                const color = isFocused ? colors.primary : "#7A7B7E";

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => navigation.emit({ type: "tabLongPress", target: route.key });

                return (
                    <IconTabBar
                        key={index}
                        iconName={iconTabBarName[index]}
                        color={color}
                        onPress={onPress}
                        onLongPress={onLongPress}
                    />
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        gap: 16,
        padding: 16,
        marginTop: 0,
        backgroundColor: "#1B1D21"
    },
    iconContainer: {
        padding: 4
    }
});

export default BottomTabBar;
