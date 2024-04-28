import { useContext } from "react";
//
import { BundleContext } from "../bundle/bundle-context";

const useBundleContext = () => {
    const context = useContext(BundleContext);

    if (!context) throw new Error("useBundleContext context must be use inside BundleProvider");

    return context;
};

export default useBundleContext;
