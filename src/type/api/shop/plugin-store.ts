import { Rewards } from "@/type/api/shop/index";

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

export type SubOffers = PurchaseInformation[];


//{
//               "PurchaseInformation": {
//                 "DataAssetID": "1da5c322-47fa-f7e2-00da-96bed9c2a917",
//                 "OfferID": "1da5c322-47fa-f7e2-00da-96bed9c2a917",
//                 "StartDate": "0001-01-01T00:00:00Z",
//                 "PrimaryCurrencyID": "85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741",
//                 "Cost": {
//                   "85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741": 475
//                 },
//                 "DiscountedCost": {
//                   "85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741": 333
//                 },
//                 "DiscountedPercentage": 30,
//                 "Rewards": [
//                   {
//                     "ItemTypeID": "dd3bf334-87f3-40bd-b043-682a57a8dc3a",
//                     "ItemID": "1da5c322-47fa-f7e2-00da-96bed9c2a917",
//                     "Quantity": 2
//                   }
//                 ],
//                 "AdditionalContext": [
//
//                 ],
//                 "WholesaleOnly": false
//               }
//             },
