import { Offer } from "@/types/api/shop/index";

export type BonusStore = {
    /** Night market */
    BonusStoreOffers: BonusStoreOffers;
    BonusStoreRemainingDurationInSeconds: number;
} | undefined;

export type BonusStoreOffer = {
    /** UUID */
    BonusOfferID: string;
    Offer: Offer;
    DiscountPercent: number;
    DiscountCosts: {
        [x: string]: number;
    };
    IsSeen: boolean;
};

export type BonusStoreOffers = BonusStoreOffer[];
