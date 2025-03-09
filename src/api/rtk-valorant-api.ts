import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// types
import { Agents } from "@/types/api/agent";
import { Theme } from "@/types/api/shop/theme";
import { Weapon } from "@/types/api/shop/weapon";
import { BundleInfo } from "@/types/api/shop/bundle";
import { WeaponSkin, WeaponSkins } from "@/types/api/shop/weapon-skin";
import { Buddies, Buddy, PlayerCard, PlayerTitle, Spray } from "@/types/api/shop";

export type Response<T> = {
    data: T;
    status: number;
};

const BASE_URL = "https://valorant-api.com/v1/";

const findItemByLevelId = <T>(items: T[], levelId: string): T | undefined => {
    return items.find(item =>
        (item as any).levels.some((level: { uuid: string }) => level.uuid === levelId),
    );
};

export const rtkValorantApi = createApi({
    reducerPath: "valorantApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json");
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getBundleById: builder.query<Response<BundleInfo>, string>({
            query: (id) => `/bundles/${id}`,
        }),
        getWeaponByLevelId: builder.query<Response<WeaponSkin>, string>({
            query: () => `/weapons/skins`,
            // @ts-ignore
            transformResponse: (response: Response<WeaponSkins>, _meta, arg) => {
                const foundSkin = findItemByLevelId(response.data, arg);
                return foundSkin ? { status: 200, data: foundSkin } : { status: 404, data: undefined };
            },
            keepUnusedDataFor: 3600,
        }),
        getWeaponById: builder.query<Response<Weapon>, string>({
            query: (id) => `/weapons/${id}`,
        }),
        getThemeById: builder.query<Response<Theme>, string>({
            query: (id) => `/themes/${id}`,
        }),
        getPlayerCardId: builder.query<Response<PlayerCard>, string>({
            query: (id) => `/playercards/${id}`,
        }),
        getSprayById: builder.query<Response<Spray>, string>({
            query: (id) => `/sprays/${id}`,
        }),
        getTitleById: builder.query<Response<PlayerTitle>, string>({
            query: (id) => `/playertitles/${id}`,
        }),
        getGunBuddyById: builder.query<Response<Buddy>, string>({
            query: () => "/buddies",
            // @ts-ignore
            transformResponse: (response: Response<Buddies>, _meta, arg) => {
                const foundBuddy = findItemByLevelId(response.data, arg);
                return foundBuddy ? { status: 200, data: foundBuddy } : { status: 404, data: undefined };
            },
        }),
        getAgents: builder.query<Response<Agents>, undefined>({
            query: () => "/agents?isPlayableCharacter=true",
        }),
    }),
});

export const {
    useGetAgentsQuery,
    useGetThemeByIdQuery,
    useGetTitleByIdQuery,
    useGetSprayByIdQuery,
    useGetBundleByIdQuery,
    useGetWeaponByIdQuery,
    useGetPlayerCardIdQuery,
    useGetGunBuddyByIdQuery,
    useGetWeaponByLevelIdQuery,
} = rtkValorantApi;
