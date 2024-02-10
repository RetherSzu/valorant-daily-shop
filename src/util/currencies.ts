export const getCurrencyByUuid = (currency: string) => {
    switch (currency) {
        case "85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741":
        case "vp":
            return require("../../assets/currencies/valorant-point.png");
        case "85ca954a-41f2-ce94-9b45-8ca3dd39a00d":
        case"kc":
            return require("../../assets/currencies/kingdom-credit.png");
        case "e59aa87c-4cbf-517a-5983-6e81511be9b7":
        case "rp":
            return require("../../assets/currencies/radianite-point.png");
    }
};
