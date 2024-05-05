import { Offer } from "@/type/api/shop/index";

export type AccessoryStore = {
    AccessoryStoreOffers: AccessoryStoreOffers;
    AccessoryStoreRemainingDurationInSeconds: number;
    /** UUID */
    StorefrontID: string;
};

export type AccessoryStoreOffer = {
    Offer: Offer;
    /** UUID */
    ContractID: string;
};

export type AccessoryStoreOffers = AccessoryStoreOffer[];
