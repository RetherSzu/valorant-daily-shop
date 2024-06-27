import { ReactNode, useMemo, useReducer } from "react";
// types
import { OwnedItem } from "@/types/api/owned-items";
import { FavoriteSkin } from "@/types/api/favorite-skin";
import { WeaponSkin } from "@/types/api/shop/weapon-skin";
import { EProfileContextType, IProfileAction, IProfileContext } from "@/types/context/profile";
import { PlayerLoadoutGun, PlayerLoadoutGuns, PlayerLoadoutResponse } from "@/types/api/player-loadout";
//
import { initialProfileState, ProfileContext } from "./profile-context";
import { Agents } from "@/types/api/agent";

// --------------------------------------------------------------------

type GunCategoryKeys = "SIDEARMS" | "SMGS" | "SHOTGUNS" | "RIFLES" | "MELEE" | "SNIPER RIFLES" | "MACHINE GUNS";

type GunCategoriesType = {
    [key in GunCategoryKeys]: PlayerLoadoutGuns;
};

const gunCategories = {
    "SIDEARMS": [
        "29a0cfab-485b-f5d5-779a-b59f85e204a8", // Classic
        "42da8ccc-40d5-affc-beec-15aa47b42eda", // Shorty
        "44d4e95c-4157-0037-81b2-17841bf2e8e3", // Frenzy
        "1baa85b4-4c70-1284-64bb-6481dfc3bb4e", // Ghost
        "e336c6b8-418d-9340-d77f-7a9e4cfe0702",  // Sheriff
    ],
    "SMGS": [
        "f7e1b454-4ad4-1063-ec0a-159e56b58941", // Stinger
        "462080d1-4035-2937-7c09-27aa2a5c27a7",  // Spectre
    ],
    "SHOTGUNS": [
        "910be174-449b-c412-ab22-d0873436b21b", // Bucky
        "ec845bf4-4f79-ddda-a3da-0db3774b2794",  // Judge
    ],
    "RIFLES": [
        "ae3de142-4d85-2547-dd26-4e90bed35cf7", // Bulldog
        "4ade7faa-4cf1-8376-95ef-39884480959b", // Guardian
        "ee8e8d15-496b-07ac-e5f6-8fae5d4c7b1a", // Phantom
        "9c82e19d-4575-0200-1a81-3eacf00cf872",  // Vandal
    ],
    "MELEE": [
        "2f59173c-4bed-b6c3-2191-dea9b58be9c7",  // Melee
    ],
    "SNIPER RIFLES": [
        "c4883e50-4494-202c-3ec3-6b8a9284f00b", // Marshal
        "5f0aaf7a-4289-3998-d5ff-eb9a5cf7ef5c", // Outlaw
        "a03b24d3-4319-996d-0f8c-94bbfba1dfc7",  // Operator
    ],
    "MACHINE GUNS": [
        "55d8a0f4-4274-ca67-fe2c-06ab45efdf58",  // Ares
        "63e6c2b6-4a8e-869c-3d4c-e38355226584", // Odin
    ],
};

const reducer = (state: IProfileContext, action: IProfileAction<EProfileContextType>) => {
    let ac;

    switch (action.type) {
        case EProfileContextType.SET_SKINS:
            ac = action as IProfileAction<EProfileContextType.SET_SKINS>;
            return {
                ...state,
                skins: ac.payload.skins,
            };
        case EProfileContextType.SET_SKIN_VARIANTS:
            ac = action as IProfileAction<EProfileContextType.SET_SKIN_VARIANTS>;
            return {
                ...state,
                skinVariants: ac.payload.skinVariants,
            };
        case EProfileContextType.SET_PLAYER_LOADOUT:
            ac = action as IProfileAction<EProfileContextType.SET_PLAYER_LOADOUT>;
            return {
                ...state,
                playerLoadout: ac.payload.playerLoadout,
            };
        case EProfileContextType.SET_CURRENT_SKIN:
            ac = action as IProfileAction<EProfileContextType.SET_CURRENT_SKIN>;
            return {
                ...state,
                currentPlayerLoadoutSkin: ac.payload.currentPlayerLoadoutSkin,
            };
        case EProfileContextType.SET_PLAYER_LOADOUT_GUN:
            ac = action as IProfileAction<EProfileContextType.SET_PLAYER_LOADOUT_GUN>;
            return {
                ...state,
                currentPlayerLoadoutGun: ac.payload.currentPlayerLoadoutGun,
            };
        case EProfileContextType.SET_FAVORITE_SKINS:
            ac = action as IProfileAction<EProfileContextType.SET_FAVORITE_SKINS>;
            return {
                ...state,
                favoriteSkins: ac.payload.favoriteSkins,
            };
        case EProfileContextType.SET_DEFAULT_PLAYER_LOADOUT:
            ac = action as IProfileAction<EProfileContextType.SET_DEFAULT_PLAYER_LOADOUT>;
            return {
                ...state,
                defaultPlayerLoadout: ac.payload.defaultPlayerLoadout,
            };
        case EProfileContextType.SET_OWNED_AGENTS:
            ac = action as IProfileAction<EProfileContextType.SET_OWNED_AGENTS>;
            return {
                ...state,
                ownedAgents: ac.payload.ownedAgents,
            };
        case EProfileContextType.SET_AGENTS:
            ac = action as IProfileAction<EProfileContextType.SET_AGENTS>;
            return {
                ...state,
                agents: ac.payload.agents,
            };
        default:
            return state;
    }
};

type BundleProviderProps = {
    children: ReactNode;
};

const ProfileProvider = ({ children }: BundleProviderProps) => {

    const [state, dispatch] = useReducer(reducer, initialProfileState);

    const setSkins = (skins: OwnedItem) => {
        dispatch({
            type: EProfileContextType.SET_SKINS,
            payload: {
                skins: skins,
            },
        });
    };

    const setSkinVariants = (skinVariants: OwnedItem) => {
        dispatch({
            type: EProfileContextType.SET_SKIN_VARIANTS,
            payload: {
                skinVariants: skinVariants,
            },
        });
    };

    const setPlayerLoadout = (playerLoadout: PlayerLoadoutResponse) => {
        dispatch({
            type: EProfileContextType.SET_DEFAULT_PLAYER_LOADOUT,
            payload: {
                defaultPlayerLoadout: playerLoadout,
            },
        });

        const categorizedGuns: GunCategoriesType = {
            "SIDEARMS": [],
            "SMGS": [],
            "SHOTGUNS": [],
            "RIFLES": [],
            "MELEE": [],
            "SNIPER RIFLES": [],
            "MACHINE GUNS": [],
        };

        playerLoadout.Guns.forEach(gun => {
            Object.keys(gunCategories).forEach((category: string) => {
                const c = category as GunCategoryKeys;
                if (gunCategories[c].includes(gun.ID)) {
                    categorizedGuns[c].push(gun);
                }
            });
        });

        // Sort the guns in each category according to the specified order
        Object.keys(categorizedGuns).forEach((category: string) => {
            const c = category as GunCategoryKeys;
            categorizedGuns[c].sort((a, b) => gunCategories[c].indexOf(a.ID) - gunCategories[c].indexOf(b.ID));
        });

        dispatch({
            type: EProfileContextType.SET_PLAYER_LOADOUT,
            payload: {
                playerLoadout: {
                    ...playerLoadout,
                    Guns: Object.keys(categorizedGuns).map((category: string) => {
                        const key = category as GunCategoryKeys;
                        return {
                            title: key,
                            data: categorizedGuns[key],
                        };
                    }),
                },
            },
        });
    };

    const setCurrentPlayerLoadoutSkin = (currentSkin: WeaponSkin) => {
        dispatch({
            type: EProfileContextType.SET_CURRENT_SKIN,
            payload: {
                currentPlayerLoadoutSkin: currentSkin,
            },
        });
    };

    const setCurrentPlayerLoadoutGun = (playerLoadoutGun: PlayerLoadoutGun) => {
        dispatch({
            type: EProfileContextType.SET_PLAYER_LOADOUT_GUN,
            payload: {
                currentPlayerLoadoutGun: playerLoadoutGun,
            },
        });
    };

    const setFavoriteSkins = (favoriteSkins: FavoriteSkin) => {
        dispatch({
            type: EProfileContextType.SET_FAVORITE_SKINS,
            payload: {
                favoriteSkins: favoriteSkins,
            },
        });
    };

    const setOwnedAgents = (ownedAgents: OwnedItem) => {
        dispatch({
            type: EProfileContextType.SET_OWNED_AGENTS,
            payload: {
                ownedAgents: ownedAgents,
            },
        });
    };

    const setAgents = (agents: Agents) => {
        dispatch({
            type: EProfileContextType.SET_AGENTS,
            payload: {
                agents: agents,
            },
        });
    };

    const memoizedValue = useMemo(
        () => ({
            ...state,
            setSkins,
            setAgents,
            setOwnedAgents,
            setSkinVariants,
            setPlayerLoadout,
            setFavoriteSkins,
            setCurrentPlayerLoadoutSkin,
            setCurrentPlayerLoadoutGun,
        }),
        [
            state.skins,
            state.agents,
            state.ownedAgents,
            state.skinVariants,
            state.playerLoadout,
            state.favoriteSkins,
            state.defaultPlayerLoadout,
            state.currentPlayerLoadoutGun,
            state.currentPlayerLoadoutSkin,
        ],
    );

    return (
        <ProfileContext.Provider value={memoizedValue}>
            {children}
        </ProfileContext.Provider>
    );
};

export default ProfileProvider;
