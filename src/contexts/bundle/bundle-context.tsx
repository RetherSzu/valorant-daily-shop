import { createContext } from "react";
// types
import { IBundleContext } from "@/types/context/bundle";

// ----------------------------------------------------------

export const initialBundleState: IBundleContext = {
    bundles: {
        Bundles: [],
        Bundle: undefined,
        BundleRemainingDurationInSeconds: 0,
    },
    setBundles: () => {},
};

// ----------------------------------------------------------

export const BundleContext = createContext(initialBundleState);
