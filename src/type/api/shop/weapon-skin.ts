export type WeaponSkin = {
    uuid: string;
    displayName: string;
    themeUuid: string;
    contentTierUuid: string;
    displayIcon: string;
    wallpaper: string;
    chromas: WeaponChroma[];
    levels: WeaponLevel[];
}

export type WeaponChroma = {
    uuid: string;
    displayName: string;
    displayIcon: string;
    fullRender: string;
    swatch: string;
    streamedVideo: string;
}

export type WeaponLevel = {
    uuid: string;
    displayName: string;
    displayIcon: string;
    streamedVideo: string;
}
