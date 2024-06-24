import React, { useEffect } from "react";
import { SectionList } from "react-native";
// api
import valorantProvider from "@/api/valorant-provider";
// components
import Text from "@/components/typography/text";
import Loading from "@/components/loading/loading";
// contexts
import useProfileContext from "@/contexts/hook/use-profile-context";
// screens
import CollectionCard from "@/screens/profile/collection/collection-card";

const CollectionView = () => {

    const { playerLoadout, setSkinVariants, setPlayerLoadout, setSkins, setFavoriteSkins } = useProfileContext();

    const fetchOwnedItems = async () => {
        const skins = await valorantProvider.getOwnedItems("e7c63390-eda7-46e0-bb7a-a6abdacd2433");
        const skinVariants = await valorantProvider.getOwnedItems("3ad1b2b2-acdb-4524-852f-954a76ddae0a");
        const playerLoadout = await valorantProvider.getPlayerLoadout();
        const playerFavoriteSkins = await valorantProvider.getPlayerFavoriteSkin();

        setSkins(skins);
        setSkinVariants(skinVariants);
        setPlayerLoadout(playerLoadout);
        setFavoriteSkins(playerFavoriteSkins);
    };

    useEffect(() => {
        (async () => fetchOwnedItems())();
    }, []);

    if (!playerLoadout) {
        return <Loading />;
    }

    return (
        <SectionList
            sections={playerLoadout.Guns}
            contentContainerStyle={{ padding: 16, gap: 16 }}
            renderItem={({ item }) => <CollectionCard playerLoadoutGun={item} />}
            renderSectionHeader={({ section: { title } }) => (
                <Text
                    variant="headlineLarge"
                    style={{ textTransform: "uppercase", fontFamily: "Vandchrome" }}
                >
                    {title}
                </Text>
            )}
        />
    );
};

export default React.memo(CollectionView);
