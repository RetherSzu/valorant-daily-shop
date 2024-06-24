import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
// api
import { rtkValorantApi } from "@/api/rtk-valorant-api";

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [rtkValorantApi.reducerPath]: rtkValorantApi.reducer
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable the serializable check middleware
        }).concat(rtkValorantApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Reset the store when the user logs out
export const resetStore = () => {
    store.dispatch(rtkValorantApi.util.resetApiState());
};
