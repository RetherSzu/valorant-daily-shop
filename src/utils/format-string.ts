const GUN_NAMES = [
    "Classic", "Shorty", "Frenzy", "Ghost", "Sheriff",
    "Stinger", "Spectre", "Bucky", "Judge", "Bulldog",
    "Guardian", "Phantom", "Vandal", "Marshal", "Operator",
    "Ares", "Odin",
];

export const addSpaceBeforeUpperCase = (str: string) => {
    return str.replace(/([A-Z])/g, " $1").trim();
};

export const getWeaponName = (displayName: string, themeName?: string) => {
    const displayNameWords = displayName.split(" ");
    const skinName = displayNameWords.filter(word => GUN_NAMES.includes(word)).join(" ");
    if (skinName === "") return themeName ? displayName.replace(themeName ?? "", "").trim() : "Knife";
    return skinName;
}

export const removeCardType = (displayName: string, type: string) => {
    return displayName.toLowerCase().replace(type, "").trim();
}
