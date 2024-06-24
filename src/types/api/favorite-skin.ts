export type FavoriteSkin = {
    Subject: string;
    FavoritedContent: FavoritedContent
}

export type FavoritedContent = {
    // Chroma ID
    [key: string]: {
        FavoriteID: string;
        ItemID: string;
    }
}
