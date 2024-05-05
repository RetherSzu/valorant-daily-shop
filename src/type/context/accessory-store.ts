import { AccessoryStore } from "@/type/api/shop/accessory-store";

export type IAccessoryStoreContext = {
    accessoryStore: AccessoryStore;
    setAccessoryStore: (accessoryStore: AccessoryStore) => void;
}

export enum EAccessoryStoreContextType {
    DECREMENT_TIMER = "DECREMENT_TIMER",
    SET_ACCESSORY_STORE = "SET_ACCESSORY_STORE"
}

export type IPayloadAccessoryStore = {
    [EAccessoryStoreContextType.DECREMENT_TIMER]: {};
    [EAccessoryStoreContextType.SET_ACCESSORY_STORE]: {
        accessoryStore: AccessoryStore;
    };
};

export type IAccessoryStoreAction<T extends EAccessoryStoreContextType> = {
    type: T;
    payload: IPayloadAccessoryStore[T];
}
