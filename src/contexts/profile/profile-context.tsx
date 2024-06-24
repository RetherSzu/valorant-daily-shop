import { createContext } from "react";
// types
import { IProfileContext } from "@/types/context/profile";

// ----------------------------------------------------------

export const initialProfileState: IProfileContext = {
    setSkins: () => {},
    setSkinVariants: () => {},
    setPlayerLoadout: () => {},
    setFavoriteSkins: () => {},
    setCurrentPlayerLoadoutSkin: () => {},
    setCurrentPlayerLoadoutGun: () => {},
};

// ----------------------------------------------------------

export const ProfileContext = createContext(initialProfileState);
