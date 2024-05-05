import { Offers } from "@/types/api/shop";

export type SkinsPanelLayout = {
    SingleItemOffers: string[];
    SingleItemStoreOffers: Offers;
    SingleItemOffersRemainingDurationInSeconds: number;
}
