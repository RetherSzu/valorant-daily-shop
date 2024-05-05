// types
import { FeaturedBundle } from "@/types/api/shop/bundle";

export type IBundleContext = {
    bundles: FeaturedBundle;
    setBundles: (bundles: FeaturedBundle) => void;
}

export enum EBundleContextType {
    DECREMENT_TIMER = "DECREMENT_TIMER",
    SET_BUNDLES = "SET_BUNDLES",
}

export type IPayloadBundle = {
    [EBundleContextType.DECREMENT_TIMER]: {};
    [EBundleContextType.SET_BUNDLES]: {
        bundles: FeaturedBundle
    };
};

export type IBundleAction<T extends EBundleContextType> = {
    type: T;
    payload: IPayloadBundle[T];
}
