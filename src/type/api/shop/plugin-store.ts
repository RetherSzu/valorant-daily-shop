import { Offer, Rewards } from "@/type/api/shop/index";

export type PluginStore = {
    PluginID: string;
    PluginOffers: PluginOffer;
}

export type PluginStores = PluginStore[];

export type PluginOffer = {
    StoreOffers: StoreOffer[];
    RemainingDurationInSeconds: number;
}

export type StoreOffer = {
    PurchaseInformation: PurchaseInformation;
    SubOffers: SubOffers;
}

export type PurchaseInformation = {
    DataAssetID: string;
    OfferID: string;
    StartDate: string;
    PrimaryCurrencyID: string;
    Cost: {
        [x: string]: number;
    };
    DiscountedCost: {
        [x: string]: number;
    };
    DiscountedPercentage: number;
    Rewards: Rewards;
    AdditionalContext: any[];
    WholesaleOnly: boolean;
}

export type SubOffer = { PurchaseInformation: Offer };

export type SubOffers = SubOffer[];
