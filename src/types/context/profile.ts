// types
import { OwnedItem } from "@/types/api/owned-items";
import { FavoriteSkin } from "@/types/api/favorite-skin";
import { WeaponSkin } from "@/types/api/shop/weapon-skin";
import { PlayerLoadout, PlayerLoadoutGun, PlayerLoadoutResponse } from "@/types/api/player-loadout";
import { Agents } from "@/types/api/agent";

export type IProfileContext = {
    skins?: OwnedItem;
    setSkins: (skins: OwnedItem) => void;
    skinVariants?: OwnedItem;
    setSkinVariants: (skinVariants: OwnedItem) => void;
    favoriteSkins?: FavoriteSkin;
    setFavoriteSkins: (favoriteSkins: FavoriteSkin) => void;
    playerLoadout?: PlayerLoadout;
    defaultPlayerLoadout?: PlayerLoadoutResponse;
    setPlayerLoadout: (playerLoadout: PlayerLoadoutResponse) => void;
    currentPlayerLoadoutSkin?: WeaponSkin;
    setCurrentPlayerLoadoutSkin: (currentSkin: WeaponSkin) => void;
    currentPlayerLoadoutGun?: PlayerLoadoutGun;
    setCurrentPlayerLoadoutGun: (currentGun: PlayerLoadoutGun) => void;
    agents?: Agents;
    setAgents: (agents: Agents) => void;
    ownedAgents?: OwnedItem;
    setOwnedAgents: (ownedAgents: OwnedItem) => void;
}

export enum EProfileContextType {
    SET_SKINS = "SET_SKINS",
    SET_SKIN_VARIANTS = "SET_SKIN_VARIANTS",
    SET_PLAYER_LOADOUT = "SET_PLAYER_LOADOUT",
    SET_FAVORITE_SKINS = "SET_FAVORITE_SKINS",
    SET_CURRENT_SKIN = "SET_CURRENT_SKIN",
    SET_PLAYER_LOADOUT_GUN = "SET_PLAYER_LOADOUT_GUN",
    SET_DEFAULT_PLAYER_LOADOUT = "SET_DEFAULT_PLAYER_LOADOUT",
    SET_AGENTS = "SET_AGENTS",
    SET_OWNED_AGENTS = "SET_OWNED_AGENTS"
}

export type IPayloadProfile = {
    [EProfileContextType.SET_SKINS]: {
        skins: OwnedItem
    };
    [EProfileContextType.SET_SKIN_VARIANTS]: {
        skinVariants: OwnedItem
    };
    [EProfileContextType.SET_PLAYER_LOADOUT]: {
        playerLoadout?: PlayerLoadout
    }
    [EProfileContextType.SET_FAVORITE_SKINS]: {
        favoriteSkins: FavoriteSkin
    }
    [EProfileContextType.SET_CURRENT_SKIN]: {
        currentPlayerLoadoutSkin: WeaponSkin
    }
    [EProfileContextType.SET_PLAYER_LOADOUT_GUN]: {
        currentPlayerLoadoutGun: PlayerLoadoutGun
    }
    [EProfileContextType.SET_DEFAULT_PLAYER_LOADOUT]: {
        defaultPlayerLoadout: PlayerLoadoutResponse
    }
    [EProfileContextType.SET_AGENTS]: {
        agents: Agents
    }
    [EProfileContextType.SET_OWNED_AGENTS]: {
        ownedAgents: OwnedItem
    }
};

export type IProfileAction<T extends EProfileContextType> = {
    type: T;
    payload: IPayloadProfile[T];
}
