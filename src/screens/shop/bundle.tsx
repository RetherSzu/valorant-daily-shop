import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Animated, FlatList, ScrollView, View, StyleSheet, ViewToken } from "react-native";
// api
import valorantProvider from "@/api/valorant-provider";
// components
import Text from "@/components/typography/text";
import Loading from "@/components/loading/loading";
// contexts
import useBundleContext from "@/contexts/hook/use-bundle-context";
import useThemeContext from "@/contexts/hook/use-theme-context";
// factory
import CardFactory from "@/factories/card-factory";
// sections
import SlideItem from "@/sections/shop/bundle/slide-item";
import Pagination from "@/sections/shop/bundle/slider-pagination";
// types
import { BundlesData, ItemOffer } from "@/types/api/shop/bundle";

const BundleView = () => {
    const { colors } = useThemeContext();
    const { bundles: featuredBundle } = useBundleContext();

    const [bundleIndex, setBundleIndex] = useState(0);
    const [bundlesInfos, setBundlesInfos] = useState<BundlesData>([]);
    const [bundleLoading, setBundleLoading] = useState(true);

    const scrollX = useRef(new Animated.Value(0)).current;

    const handleOnScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
    );

    const handleOnViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        setBundleIndex(viewableItems[0].index ?? 0);
    }, []);

    useEffect(() => {
        async function getBundles() {
            if (featuredBundle.Bundles.length === 0) return;
            const bundlesInfos = await Promise.all(featuredBundle.Bundles.map(async (bundle) => {
                const bundleInfo = await valorantProvider.getBundle(bundle.DataAssetID);
                return { bundleInfo, bundle };
            }));

            setBundlesInfos(bundlesInfos);
            setBundleLoading(false);
        }

        getBundles();
    }, [featuredBundle.Bundles.length]);

    const renderOffer = useCallback(({ item, index }: { item: ItemOffer, index: number }) => (
        <CardFactory offer={item.Offer} key={index} />
    ), []);

    const offerList = useMemo(() => (
        bundlesInfos[bundleIndex]?.bundle?.ItemOffers?.map((item, index) => renderOffer({ item, index }))
    ), [bundleIndex, bundlesInfos, renderOffer]);

    if (bundleLoading || !bundlesInfos.length) {
        return (
            <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
                <Loading />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={[styles.scrollViewContainer, { backgroundColor: colors.background }]}>
            <View style={styles.flatListContainer}>
                <FlatList
                    horizontal
                    pagingEnabled
                    data={bundlesInfos}
                    overScrollMode="never"
                    snapToAlignment="center"
                    onScroll={handleOnScroll}
                    showsHorizontalScrollIndicator={false}
                    onViewableItemsChanged={handleOnViewableItemsChanged}
                    renderItem={({ item, index }) => <SlideItem bundle={item} bundleIndex={index} />}
                />
                {bundlesInfos.length > 1 && <Pagination data={bundlesInfos} scrollX={scrollX} />}
            </View>

            <Text variant="headlineMedium" style={styles.collectionText}>COLLECTION</Text>

            {offerList}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    scrollViewContainer: {
        gap: 16,
        paddingTop: 16,
        paddingHorizontal: 16,
    },
    flatListContainer: {
        position: "relative",
    },
    collectionText: {
        fontFamily: "Nota",
    },
});

export default React.memo(BundleView);
