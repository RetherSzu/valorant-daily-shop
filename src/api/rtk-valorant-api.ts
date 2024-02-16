import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// type
import { WeaponTheme } from "@/type/api/shop/weapon-theme";
import { WeaponSkin, WeaponSkins } from "@/type/api/shop/weapon-skin";
import { Buddies, Buddy, PlayerCard, PlayerTitle, Spray } from "@/type/api/shop";

type Response<T> = {
    data: T,
    status: number
}

export const rtkValorantApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "https://valorant-api.com/v1/",
        prepareHeaders: async (headers) => {
            headers.set("Content-Type", "application/json");
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getWeaponByLevelId: builder.query<Response<WeaponSkin>, string>({
            query: (_id) => `/weapons/skins`,
            // @ts-ignore
            transformResponse: (response: Response<WeaponSkins>, _meta, arg) => {
                for (let i = 0; i < response.data.length; i++) {
                    for (let x = 0; x < response.data[i].levels.length; x++) {
                        if (response.data[i].levels[x].uuid === arg) {
                            return { status: 200, data: response.data[i] };
                        }
                    }
                }
                return { status: 404, data: undefined };
            }
        }),
        getThemeById: builder.query<Response<WeaponTheme>, string>({
            query: (id) => `/themes/${id}`
        }),
        getPlayerCardId: builder.query<Response<PlayerCard>, string>({
            query: (id) => `/playercards/${id}`
        }),
        getSprayById: builder.query<Response<Spray>, string>({
            query: (id) => `/sprays/${id}`
        }),
        getTitleById: builder.query<Response<PlayerTitle>, string>({
            query: (id) => `/playertitles/${id}`
        }),
        getGunBuddyById: builder.query<Response<Buddy>, string>({
            query: (_id) => "/buddies",
            // @ts-ignore
            transformResponse: (response: Response<Buddies>, _meta, arg) => {
                for (let i = 0; i < response.data.length; i++) {
                    for (let x = 0; x < response.data[i].levels.length; x++) {
                        if (response.data[i].levels[x].uuid === arg) {
                            return { status: 200, data: response.data[i] };
                        }
                    }
                }
                return { status: 404, data: undefined };
            }
        })
    }),
    reducerPath: "valorantApi"
});

export const {
    useGetWeaponByLevelIdQuery,
    useGetThemeByIdQuery,
    useGetPlayerCardIdQuery,
    useGetSprayByIdQuery,
    useGetTitleByIdQuery,
    useGetGunBuddyByIdQuery
} = rtkValorantApi;
