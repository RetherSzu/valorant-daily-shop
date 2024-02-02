import { Pressable } from "react-native";
import * as React from "react";
// component
import SvgShop from "@/component/icon/shop";
import SvgSetting from "@/component/icon/setting";
// context
import { useThemeContext } from "@/context/hook/use-theme-context";

const ICONS: { [key: string]: React.FC<{ color: string }>; } = {
    Shop: SvgShop,
    Setting: SvgSetting
};

type Props = {
    iconName: string;
    color: string;
    onPress: () => void;
    onLongPress: () => void;
};

const IconTabBar = ({ iconName, color, onPress, onLongPress }: Props) => {

    const { colors } = useThemeContext();

    const IconComponent = ICONS[iconName] || null;
    return (
        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            android_ripple={{ color: colors.primary, borderless: true }}
            className="w-8 h-8 justify-center items-center"
        >
            {IconComponent && <IconComponent color={color} />}
        </Pressable>
    );
};


export default IconTabBar;
