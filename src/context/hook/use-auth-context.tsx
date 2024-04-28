import { useContext } from "react";
// context
import { AuthContext } from "@/context/auth/auth-context";

const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) throw new Error("useAuthContext context must be use inside AuthProvider");

    return context;
};

export default useAuthContext;
