import { useContext } from "react";
// context
import { UserContext } from "@/context/user/user-context";

const useUserContext = () => {
    const context = useContext(UserContext);

    if (!context) throw new Error("useUserContext context must be use inside UserProvider");

    return context;
};

export default useUserContext;
