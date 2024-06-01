import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
// components
import Loading from "@/components/loading/loading";
// contexts
import useThemeContext from "@/contexts/hook/use-theme-context";
import usePluginContext from "@/contexts/hook/use-plugin-context";
// sections
import PluginItem from "@/sections/shop/plugin-store/plugin-item";

const PluginStore = () => {

    const { colors } = useThemeContext();

    const { plugins } = usePluginContext();

    if (!plugins) return <Loading />;

    const renderPlugins = useMemo(() => (
        plugins.map((plugin, index) => (
            <PluginItem plugin={plugin} key={index} />
        ))
    ), [plugins]);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.pluginList}>
                {renderPlugins}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    pluginList: {
        flex: 1,
    },
});

export default React.memo(PluginStore);
