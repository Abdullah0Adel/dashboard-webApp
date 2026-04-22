import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {  LogingPayload, StrapiAuthResponse, User } from "./types";
import { RootState } from "../../store";

export const authApi = createApi({
    reducerPath: "authApi",

    baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_STRAPI_URL,

        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),

    endpoints: (builder) => ({
        // Login
        login: builder.mutation<StrapiAuthResponse, LogingPayload >({
            // mutation
            // تستخدم للعمليات اللي بتغير الداتا زي:
            //  POST 
            //  PUT
            //  DELETE
            //  PATCH
            query: (credentials) =>({
                url: "/api/auth/local",
                method: "POST",
                body: credentials
            })
        }),

        register:builder.mutation <StrapiAuthResponse,
        { userName: string; email: string; password: string}
        >({
            query: (data) => ({
                url: "/api/auth/local/register",
                method: "POST",
                body: data
            })
        }),


        // ✅ Get current user (للـ me endpoint في Strapi)
        getMe: builder.query<User, void>({
            query: () => "/api/users/me",
        }),
    })

});

export const {useLoginMutation, useRegisterMutation, useGetMeQuery} = authApi;