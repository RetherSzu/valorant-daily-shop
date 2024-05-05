import { useContext } from "react";
//
import { AccessoryStoreContext } from "../accessory-store/accessory-store-context";

const useAccessoryStoreContext = () => {
    const context = useContext(AccessoryStoreContext);

    if (!context) throw new Error("useAccessoryStoreContext context must be use inside AccessoryStoreProvider");

    return context;
};

export default useAccessoryStoreContext;
