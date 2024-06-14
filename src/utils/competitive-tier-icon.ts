export const getCompetitiveTierIcon = (rank: string) => {

    const rankSplit = rank.toLowerCase().split(" ");

    rank = rankSplit[0];
    const rankNumber = rankSplit[1];

    switch (rank.toLowerCase()) {
        case "iron":
            if (rankNumber === "1") return require(`../../assets/competitive-tiers/iron-1.png`);
            if (rankNumber === "2") return require(`../../assets/competitive-tiers/iron-2.png`);
            return require(`../../assets/competitive-tiers/iron-3.png`);
        case "bronze":
            if (rankNumber === "1") return require(`../../assets/competitive-tiers/bronze-1.png`);
            if (rankNumber === "2") return require(`../../assets/competitive-tiers/bronze-2.png`);
            return require(`../../assets/competitive-tiers/bronze-3.png`);
        case "silver":
            if (rankNumber === "1") return require(`../../assets/competitive-tiers/silver-1.png`);
            if (rankNumber === "2") return require(`../../assets/competitive-tiers/silver-2.png`);
            return require(`../../assets/competitive-tiers/silver-3.png`);
        case "gold":
            if (rankNumber === "1") return require(`../../assets/competitive-tiers/gold-1.png`);
            if (rankNumber === "2") return require(`../../assets/competitive-tiers/gold-2.png`);
            return require(`../../assets/competitive-tiers/gold-3.png`);
        case "platinum":
            if (rankNumber === "1") return require(`../../assets/competitive-tiers/platinum-1.png`);
            if (rankNumber === "2") return require(`../../assets/competitive-tiers/platinum-2.png`);
            return require(`../../assets/competitive-tiers/platinum-3.png`);
        case "diamond":
            if (rankNumber === "1") return require(`../../assets/competitive-tiers/diamond-1.png`);
            if (rankNumber === "2") return require(`../../assets/competitive-tiers/diamond-2.png`);
            return require(`../../assets/competitive-tiers/diamond-3.png`);
        case "ascendant":
            if (rankNumber === "1") return require(`../../assets/competitive-tiers/ascendant-1.png`);
            if (rankNumber === "2") return require(`../../assets/competitive-tiers/ascendant-2.png`);
            return require(`../../assets/competitive-tiers/ascendant-3.png`);
        case "immortal":
            if (rankNumber === "1") return require(`../../assets/competitive-tiers/immortal-1.png`);
            if (rankNumber === "2") return require(`../../assets/competitive-tiers/immortal-2.png`);
            return require(`../../assets/competitive-tiers/immortal-3.png`);
        case "radiant":
            return require(`../../assets/competitive-tiers/radiant.png`);
        default:
            return require(`../../assets/competitive-tiers/unranked.png`);
    }
};
