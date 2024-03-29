import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, FlatList, NativeScrollEvent, NativeSyntheticEvent, View, ViewToken } from "react-native";
// api
import valorantProvider from "@/api/valorant-provider";
// component
import Text from "@/component/typography/text";
import Loading from "@/component/loading/loading";
// context
import { useAuthContext } from "@/context/hook/use-auth-context";
import { useThemeContext } from "@/context/hook/use-theme-context";
// section
import SlideItem from "@/section/shop/bundle/slide-item";
import BundleSkin from "@/section/shop/bundle/skin/bundle-skin";
import BundleCard from "@/section/shop/bundle/bundle-card/bundle-card";
import BundleSpray from "@/section/shop/bundle/bundle-spray/bundle-spray";
import Pagination from "@/section/shop/bundle/slider-pagination";
import BundleGunBuddy from "@/section/shop/bundle/gun-buddy/bundle-gun-buddy";
import BundlePlayerTitle from "@/section/shop/bundle/bundle-player-title-skeleton/bundle-player-title";
// type
import { BundlesData } from "@/type/api/shop/bundle";

const BundleView = () => {

    const { colors } = useThemeContext();

    const { shop: { bundles: featuredBundle } } = useAuthContext();

    const [bundleIndex, setBundleIndex] = useState(0);

    const [bundlesInfos, setBundlesInfos] = useState<BundlesData>([]);

    const [bundleLoading, setBundleLoading] = useState<boolean>(true);

    const scrollX = useRef(new Animated.Value(0)).current;

    const handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        Animated.event(
            [
                {
                    nativeEvent: {
                        contentOffset: {
                            x: scrollX
                        }
                    }
                }
            ],
            {
                useNativeDriver: false
            }
        )(event);
    };

    const handleOnViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        setBundleIndex(viewableItems[0].index ?? 0);
    }, []);

    useEffect(() => {
        const getBundles = async () => {
            if (featuredBundle.Bundles.length === 0) return;
            const bundlePromises = featuredBundle.Bundles.map(async (bundle) => {
                const bundleInfo = await valorantProvider.getBundle(bundle.DataAssetID);
                return { bundleInfo, bundle };
            });

            const bundlesInfos = await Promise.all(bundlePromises);

            setBundlesInfos((prev) => [...prev, ...bundlesInfos]);
            setBundleLoading(false);
        };

        (async () => getBundles())();
    }, [featuredBundle.Bundles.length]);

    if (bundleLoading || bundlesInfos.length === 0) {
        return (
            <View
                style={{
                    backgroundColor: colors.background,
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Loading />
            </View>
        );
    }

    const renderOfferList = (
        <FlatList
            key={bundleIndex}
            overScrollMode="never"
            snapToAlignment="center"
            contentContainerStyle={{ gap: 16 }}
            showsVerticalScrollIndicator={false}
            data={bundlesInfos[bundleIndex].bundle.ItemOffers}
            renderItem={(item) => {
                switch (bundlesInfos[bundleIndex].bundle.Items[item.index].Item.ItemTypeID) {
                    case "d5f120f8-ff8c-4aac-92ea-f2b5acbe9475": // Sprays
                        return <BundleSpray offer={item.item.Offer} key={item.index} />;
                    case "dd3bf334-87f3-40bd-b043-682a57a8dc3a": // Gun Buddies
                        return <BundleGunBuddy offer={item.item.Offer} key={item.index} />;
                    case "3f296c07-64c3-494c-923b-fe692a4fa1bd": // Cards
                        return <BundleCard offer={item.item.Offer} key={item.index} />;
                    case "e7c63390-eda7-46e0-bb7a-a6abdacd2433": // Skins
                        return <BundleSkin offer={item.item.Offer} key={item.index} />;
                    case "de7caa6b-adf7-4588-bbd1-143831e786c6": // Titles
                        return <BundlePlayerTitle offer={item.item.Offer} key={item.index} />;
                    default:
                        return <BundleSkin offer={item.item.Offer} key={item.index} />;
                }
            }}
        />
    );

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
                    renderItem={(item) => <SlideItem bundle={item.item} bundleIndex={item.index} />}
                />
                {bundlesInfos.length > 1 && <Pagination data={bundlesInfos} scrollX={scrollX} />}
            </View>

            <Text variant="titleLarge" style={{ fontFamily: "DrukWide" }}>COLLECTION</Text>

            {renderOfferList}
        </View>
    );
};

export default BundleView;
