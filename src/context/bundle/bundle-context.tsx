import { createContext } from "react";
// type
import { IBundleContext } from "@/type/context/bundle";

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
