import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiResponse } from "./apiResponse";

export interface TryoutRegistrationDTO {
  registrationId?: number;
  tryoutId: number;
  playerName: string;
  contactNumber: string;
  email?: string;
  registeredAt?: string;
}

export const tryoutRegistrationApi = createApi({
  reducerPath: "tryoutRegistrationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_API_URL}TryoutRegistration/`,
  }),
  endpoints: (builder) => ({
    getRegistrationsByTryout: builder.query<ApiResponse<TryoutRegistrationDTO[]>, number>({
      query: (tryoutId) => `GetRegistrationsByTryout?tryoutId=${tryoutId}`,
    }),
    registerTryout: builder.mutation<ApiResponse<object>, TryoutRegistrationDTO>({
      query: (body) => ({
        url: `Register?tryoutId=${body.tryoutId}`,
        method: "POST",
        body,
      }),
    }),
    deleteRegistration: builder.mutation<ApiResponse<void>, number>({
      query: (id) => ({
        url: `DeleteRegistration?id=${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetRegistrationsByTryoutQuery,
  useRegisterTryoutMutation,
  useDeleteRegistrationMutation,
} = tryoutRegistrationApi;
