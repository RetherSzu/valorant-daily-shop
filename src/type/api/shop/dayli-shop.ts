import { Offers } from "@/type/api/shop/index";

export type SkinsPanelLayout = {
    SingleItemOffers: string[];
    SingleItemStoreOffers: Offers;
    SingleItemOffersRemainingDurationInSeconds: number;
}
