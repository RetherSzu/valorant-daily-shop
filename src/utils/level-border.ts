// types
import { LevelBorder } from "@/types/api/level-border";
//
import levelBorderImages from "./level-border-images";

export const getLevelBorder = (level: number): LevelBorder => {
    const levelBorderKeys = Object.keys(levelBorderImages).map(Number);
    const borderKey = levelBorderKeys.find((key) => key >= level);

    if (!borderKey) {
        throw new Error("Invalid Level");
    }

    const border = levelBorderImages[borderKey];

    return {
        displayName: `Level ${borderKey} Border`,
        startingLevel: borderKey,
        levelNumberAppearance: border.levelNumberAppearance,
        smallPlayerCardAppearance: border.smallPlayerCardAppearance,
    };
};
