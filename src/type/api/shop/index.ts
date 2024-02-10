import { BonusStore } from "@/type/api/shop/night-market";
import { SkinsPanelLayout } from "@/type/api/shop/dayli-shop";

export type StorefrontResponse = {
    FeaturedBundle: {
        Bundle: {
            /** UUID */
            ID: string;
            /** UUID */
            DataAssetID: string;
            /** Currency ID */
            CurrencyID: string;
            Items: {
                Item: {
                    /** Item Type ID */
                    ItemTypeID: string;
                    /** Item ID */
                    ItemID: string;
                    Amount: number;
                };
                BasePrice: number;
                /** Currency ID */
                CurrencyID: string;
                DiscountPercent: number;
                DiscountedPrice: number;
                IsPromoItem: boolean;
            }[];
            ItemOffers: {
                /** UUID */
                BundleItemOfferID: string;
                Offer: Offer;
                DiscountPercent: number;
                DiscountedCost: {
                    [x: string]: number;
                };
            }[] | null;
            TotalBaseCost: {
                [x: string]: number;
            } | null;
            TotalDiscountedCost: {
                [x: string]: number;
            } | null;
            TotalDiscountPercent: number;
            DurationRemainingInSeconds: number;
            WholesaleOnly: boolean;
        };
        Bundles: {
            /** UUID */
            ID: string;
            /** UUID */
            DataAssetID: string;
            /** Currency ID */
            CurrencyID: string;
            Items: {
                Item: {
                    /** Item Type ID */
                    ItemTypeID: string;
                    /** Item ID */
                    ItemID: string;
                    Amount: number;
                };
                BasePrice: number;
                /** Currency ID */
                CurrencyID: string;
                DiscountPercent: number;
                DiscountedPrice: number;
                IsPromoItem: boolean;
            }[];
            ItemOffers: {
                /** UUID */
                BundleItemOfferID: string;
                Offer: Offer;
                DiscountPercent: number;
                DiscountedCost: {
                    [x: string]: number;
                };
            }[] | null;
            TotalBaseCost: {
                [x: string]: number;
            } | null;
            TotalDiscountedCost: {
                [x: string]: number;
            } | null;
            TotalDiscountPercent: number;
            DurationRemainingInSeconds: number;
            WholesaleOnly: boolean;
        }[];
        BundleRemainingDurationInSeconds: number;
    };
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
