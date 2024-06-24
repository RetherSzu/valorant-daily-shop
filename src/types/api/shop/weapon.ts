import { WeaponSkins } from "@/types/api/shop/weapon-skin";

export type Weapon = {
    uuid: string;
    displayName: string;
    category: string;
    defaultSkinUuid: string;
    displayIcon: string;
    killStreamIcon: string;
    assetPath: string;
    weaponStats: any;
    shopData: any;
    skins: WeaponSkins;
}
