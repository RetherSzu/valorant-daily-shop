import axios from "axios";
import { clearSecureStore } from "./secure-store";

// ----------------------------------------------------------------------

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            await clearSecureStore();
        }
        await Promise.reject((error.response && error.response.data) || "Something went wrong");
    },
);
export default axiosInstance;
