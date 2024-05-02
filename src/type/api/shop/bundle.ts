import { Offer } from "@/type/api/shop";

export type FeaturedBundle = {
    Bundle: Bundle | undefined;
    Bundles: Bundles;
    BundleRemainingDurationInSeconds: number;
};

export type Bundle = {
    /** UUID */
    ID: string;
    /** UUID */
    DataAssetID: string;
    /** Currency ID */
    CurrencyID: string;
    Items: Items;
    ItemOffers: ItemOffers | null;
    TotalBaseCost: {
        [x: string]: number;
    } | null;
    TotalDiscountedCost: {
        [x: string]: number;
    } | null;
    TotalDiscountPercent: number;
    DurationRemainingInSeconds: number;
    WholesaleOnly: boolean;
}

export type Bundles = Bundle[];

export type Item = {
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
}

export type Items = Item[];

export type ItemOffer = {
    /** UUID */
    BundleItemOfferID: string;
    Offer: Offer;
    DiscountPercent: number;
    DiscountedCost: {
        [x: string]: number;
    };
}

export type ItemOffers = ItemOffer[];

export type BundleInfo = {
    uuid: string;
    displayName: string;
    description: string;
    displayIcon: string;
    displayIcon2: string;
    logoIcon: string | null;
    verticalPromoImage: string;
    useAdditionalContext: boolean;
    extraDescription: string | null;
    promoDescription: string | null;
    displayNameSubText: string | null;
}

export type BundleData = {
    bundle: Bundle;
    bundleInfo: BundleInfo;
}

export type BundlesData = BundleData[];
