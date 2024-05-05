export const getContentTierIcon = (uuid: string) => {
    switch (uuid) {
        case "12683d76-48d7-84a3-4e09-6985794f0445":
            return require("../../assets/content-tiers/select.png");
        case "0cebb8be-46d7-c12a-d306-e9907bfc5a25":
            return require("../../assets/content-tiers/deluxe.png");
        case "60bca009-4182-7998-dee7-b8a2558dc369":
            return require("../../assets/content-tiers/premium.png");
        case "e046854e-406c-37f4-6607-19a9ba8426fc":
            return require("../../assets/content-tiers/exclusive.png");
        case "411e4a55-4e59-7757-41f0-86a53f101bb5":
            return require("../../assets/content-tiers/ultra.png");
        default:
            break;
    }
};


export const getContentTierColor = (uuid: string) => {
    switch (uuid) {
        case "12683d76-48d7-84a3-4e09-6985794f0445":
            return "rgba(71, 125, 178, .1)";
        case "0cebb8be-46d7-c12a-d306-e9907bfc5a25":
            return "rgba(0, 158, 129, .1)";
        case "60bca009-4182-7998-dee7-b8a2558dc369":
            return "rgba(208, 85, 140, .1)";
        case "e046854e-406c-37f4-6607-19a9ba8426fc":
            return "rgba(244, 150, 90, .1)";
        case "411e4a55-4e59-7757-41f0-86a53f101bb5":
            return "rgba(250, 215, 99, .1)";
        default:
            break;
    }
};
