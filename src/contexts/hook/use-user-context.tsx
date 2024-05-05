import { useContext } from "react";
// contexts
import { UserContext } from "@/contexts/user/user-context";

const useUserContext = () => {
    const context = useContext(UserContext);

    if (!context) throw new Error("useUserContext context must be use inside UserProvider");

    return context;
};

export default useUserContext;
