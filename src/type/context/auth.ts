// type
import { BonusStore } from "@/type/api/shop/night-market";
import { SkinsPanelLayout } from "@/type/api/shop/dayli-shop";
import { FeaturedBundle } from "@/type/api/shop/bundle";

export type IAuthContext = {
    // fn
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    // state
    isLoading: boolean;
    isSignout: boolean;
    accessToken: string | null;
    entitlementsToken: string | null;
    // user info
    balance: {
        radianitePoint: string;
        valorantPoint: string;
        kingdomCredit: string;
    };
    shop: {
        offers: SkinsPanelLayout;
        bundles: FeaturedBundle;
        nightMarket?: BonusStore;
    };
}

export enum EAuthContextType {
    INITIAL = "INITIAL",
    SET_TOKEN = "SET_TOKEN",
    LOGOUT = "LOGOUT",
    SET_BALANCE = "SET_BALANCE",
    SET_SHOP = "SET_SHOP",
    DECREMENT_TIMER = "DECREMENT_TIMER",
}

export type IPayloadAuth = {
    [EAuthContextType.INITIAL]: {
        accessToken: string | null;
        entitlementsToken: string | null;
        balance: {
            radianitePoint: string;
            valorantPoint: string;
            kingdomCredit: string;
        };
        shop: {
            offers: any;
            bundles: any;
            nightMarket: any;
        };
    };
    [EAuthContextType.SET_TOKEN]: {
        accessToken: string | null;
        entitlementsToken: string | null;
    };
    [EAuthContextType.LOGOUT]: {};
    [EAuthContextType.SET_BALANCE]: {
        radianitePoint: string;
        valorantPoint: string;
        kingdomCredit: string;
    };
    [EAuthContextType.SET_SHOP]: {
        offers: any;
        bundles: any;
        nightMarket?: any;
    };
    [EAuthContextType.DECREMENT_TIMER]: {};
};

export type IAuthAction<T extends EAuthContextType> = {
    type: T;
    payload: IPayloadAuth[T];
}
