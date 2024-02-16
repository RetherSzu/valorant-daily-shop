import { Offers } from "@/type/api/shop";

export type SkinsPanelLayout = {
    SingleItemOffers: string[];
    SingleItemStoreOffers: Offers;
    SingleItemOffersRemainingDurationInSeconds: number;
}
