import { FeaturedBundle } from "@/type/api/shop/bundle";
import { BonusStore } from "@/type/api/shop/night-market";
import { PluginStores } from "@/type/api/shop/plugin-store";
import { SkinsPanelLayout } from "@/type/api/shop/dayli-shop";

export type StorefrontResponse = {
    FeaturedBundle: FeaturedBundle;
    SkinsPanelLayout: SkinsPanelLayout;
    UpgradeCurrencyStore: {
        UpgradeCurrencyOffers: {
            /** UUID */
            OfferID: string;
            /** Item ID */
            StorefrontItemID: string;
            Offer: Offer;
            DiscountedPercent: number;
        }[];
    };
    AccessoryStore: {
        AccessoryStoreOffers: {
            Offer: Offer;
            /** UUID */
            ContractID: string;
        }[];
        AccessoryStoreRemainingDurationInSeconds: number;
        /** UUID */
        StorefrontID: string;
    };
    /** Night market */
    BonusStore?: BonusStore;
    PluginStores?: PluginStores;
};

export type Offer = {
    OfferID: string;
    IsDirectPurchase: boolean;
    /** Date in ISO 8601 format */
    StartDate: string;
    Cost: {
        [x: string]: number;
    };
    Rewards: Rewards;
}

export type Offers = Offer[];

export type Reward = {
    /** Item Type ID */
    ItemTypeID: string;
    /** Item ID */
    ItemID: string;
    Quantity: number;
}

export type Rewards = Reward[];

export type PlayerCard = {
    uuid: string;
    displayName: string;
    displayIcon: string;
    smallArt: string;
    wideArt: string;
    largeArt: string;
    themeUuid: string | null;
    isHiddenIfNotOwned: boolean;
}

export type Spray = {
    uuid: string;
    displayName: string;
    category: string | null;
    themeUuid: string | null;
    isNullSpray: boolean;
    hideIfNotOwned: boolean;
    displayIcon: string;
    fullIcon: string;
    fullTransparentIcon: string;
    animationPng: string | null;
    animationGif: string | null;
    levels: SprayLevels;
}

export type SprayLevel = {
    uuid: string;
    sprayLevel: number;
    displayName: string;
    displayIcon: string;
}

export type SprayLevels = SprayLevel[];

export type Buddy = {
    uuid: string;
    displayName: string;
    isHiddenIfNotOwned: boolean;
    themeUuid: string | null;
    displayIcon: string;
    levels: BuddiesLevel;
}

export type Buddies = Buddy[];

export type BuddyLevel = {
    uuid: string;
    charmLevel: number;
    hideIfNotOwned: boolean;
    displayName: string;
}

export type BuddiesLevel = BuddyLevel[];

export type PlayerTitle = {
    uuid: string;
    titleText: string;
    displayName: string;
}

