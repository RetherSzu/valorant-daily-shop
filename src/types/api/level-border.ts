import { ImageSourcePropType } from "react-native";

export type LevelBorder = {
    displayName: string;
    startingLevel: number;
    levelNumberAppearance?: ImageSourcePropType;
    smallPlayerCardAppearance?: ImageSourcePropType;
};

export type LevelBorderImages = {
    [key: number]: {
        levelNumberAppearance: ImageSourcePropType;
        smallPlayerCardAppearance: ImageSourcePropType;
    };
};
