// components
import CardSkin from "@/components/card/skin/card-skin";
import CardBuddy from "@/components/card/buddy/card-buddy";
import CardSpray from "@/components/card/spray/card-spray";
import CardPlayer from "@/components/card/player-card/card-player";
import CardTitle from "@/components/card/player-title/card-title";
// types
import { Offer } from "@/types/api/shop";

type CardFactoryProps = {
    offer: Offer;
}

const CardFactory = ({ offer }: CardFactoryProps) => {
    switch (offer.Rewards[0].ItemTypeID) {
        case "d5f120f8-ff8c-4aac-92ea-f2b5acbe9475": // Sprays
            return <CardSpray offer={offer} />;
        case "dd3bf334-87f3-40bd-b043-682a57a8dc3a": // Gun Buddies
            return <CardBuddy offer={offer} />;
        case "3f296c07-64c3-494c-923b-fe692a4fa1bd": // Cards
            return <CardPlayer offer={offer} />;
        case "e7c63390-eda7-46e0-bb7a-a6abdacd2433": // Skins
            return <CardSkin offer={offer} />;
        case "de7caa6b-adf7-4588-bbd1-143831e786c6": // Titles
            return <CardTitle offer={offer} />;
        default:
            return null;
    }
};

export default CardFactory;
