// types
import { LevelBorder } from "@/types/api/level-border";
//
import levelBorderImages from "./level-border-images";

export const getLevelBorder = (level: number): LevelBorder => {
    // Get all level border keys
    const levelBorderKeys = Object.keys(levelBorderImages).map(Number);
    let borderKey = levelBorderKeys.find((key) => key >= level);

    let border;
    if (borderKey) {
        border = levelBorderImages[borderKey];
    } else {
        borderKey = 1;
        border = levelBorderImages[borderKey];
    }

    return {
        displayName: `Level ${borderKey} Border`,
        startingLevel: borderKey,
        levelNumberAppearance: border.levelNumberAppearance,
        smallPlayerCardAppearance: border.smallPlayerCardAppearance,
    };
};
