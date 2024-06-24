import { useContext } from "react";
//
import { ProfileContext } from "../profile/profile-context";

const useProfileContext = () => {
    const context = useContext(ProfileContext);

    if (!context) throw new Error("useProfileContext context must be use inside ProfileProvider");

    return context;
};

export default useProfileContext;
