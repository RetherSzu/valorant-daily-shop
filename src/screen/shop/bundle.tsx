import { Animated, FlatList, View, ViewToken } from "react-native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// api
import valorantProvider from "@/api/valorant-provider";
// component
import Text from "@/component/typography/text";
import Loading from "@/component/loading/loading";
// context
import useBundleContext from "@/context/hook/use-bundle-context";
import useThemeContext from "@/context/hook/use-theme-context";
// section
import SlideItem from "@/section/shop/bundle/slide-item";
import BundleSkin from "@/section/shop/bundle/skin/bundle-skin";
import BundleCard from "@/section/shop/bundle/card/bundle-card";
import Pagination from "@/section/shop/bundle/slider-pagination";
import BundleSpray from "@/section/shop/bundle/spray/bundle-spray";
import BundleGunBuddy from "@/section/shop/bundle/gun-buddy/bundle-gun-buddy";
import BundlePlayerTitle from "@/section/shop/bundle/player-title/bundle-player-title";
// types
import { BundlesData, ItemOffer } from "@/type/api/shop/bundle";

const BundleView = () => {
    const { colors } = useThemeContext();
    const { bundles: featuredBundle } = useBundleContext();

    const [bundleIndex, setBundleIndex] = useState(0);
    const [bundlesInfos, setBundlesInfos] = useState<BundlesData>([]);
    const [bundleLoading, setBundleLoading] = useState(true);

    const scrollX = useRef(new Animated.Value(0)).current;

    const handleOnScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false },
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

    const renderOffer = useCallback(({ item, index }: { item: ItemOffer, index: number }) => {
        console.log(bundlesInfos[bundleIndex]);
        const itemTypeID = bundlesInfos[bundleIndex].bundle.Items[index].Item.ItemTypeID;
        const { Offer } = item;
        const theme = bundlesInfos[bundleIndex].bundleInfo;

        switch (itemTypeID) {
            case "d5f120f8-ff8c-4aac-92ea-f2b5acbe9475": // Sprays
                return <BundleSpray key={index} offer={Offer} theme={theme} />;
            case "dd3bf334-87f3-40bd-b043-682a57a8dc3a": // Gun Buddies
                return <BundleGunBuddy key={index} offer={Offer} theme={theme} />;
            case "3f296c07-64c3-494c-923b-fe692a4fa1bd": // Cards
                return <BundleCard key={index} offer={Offer} theme={theme} />;
            case "e7c63390-eda7-46e0-bb7a-a6abdacd2433": // Skins
                return <BundleSkin key={index} offer={Offer} theme={theme} />;
            case "de7caa6b-adf7-4588-bbd1-143831e786c6": // Titles
                return <BundlePlayerTitle key={index} offer={Offer} />;
            default:
                return <BundleSkin key={index} offer={Offer} theme={theme} />;
        }
    }, [bundleIndex, bundlesInfos]);

    const offerList = useMemo(() => (
        <FlatList
            key={bundleIndex}
            overScrollMode="never"
            snapToAlignment="center"
            contentContainerStyle={{ gap: 16 }}
            showsVerticalScrollIndicator={false}
            data={bundlesInfos[bundleIndex]?.bundle?.ItemOffers ?? []}
            renderItem={renderOffer}
        />
    ), [bundleIndex, bundlesInfos, renderOffer]);

    if (bundleLoading || !bundlesInfos.length) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: colors.background,
                }}
            >
                <Loading />
            </View>
        );
    }

    return (
        <View style={{ backgroundColor: colors.background, flex: 1, paddingHorizontal: 16, gap: 16, paddingTop: 16 }}>
            <View style={{ position: "relative" }}>
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

            <Text variant="headlineMedium" style={{ fontFamily: "Nota" }}>COLLECTION</Text>
            {offerList}
        </View>
    );
};

export default BundleView;
