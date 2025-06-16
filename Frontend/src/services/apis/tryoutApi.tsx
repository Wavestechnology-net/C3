import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiResponse } from "./apiResponse";

export interface TryoutDTO {
  tryoutId?: number;
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
}

export const tryoutApi = createApi({
  reducerPath: "tryoutApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_API_URL}Tryout/`,
  }),
  endpoints: (builder) => ({
    getAllTryouts: builder.query<ApiResponse<TryoutDTO[]>, void>({
      query: () => "GetAllTryouts",
    }),
    getTryoutById: builder.query<ApiResponse<TryoutDTO>, number>({
      query: (id) => `GetTryoutById?id=${id}`,
    }),
    createTryout: builder.mutation<ApiResponse<object>, TryoutDTO>({
      query: (body) => ({
        url: "CreateTryout",
        method: "POST",
        body,
      }),
    }),
    updateTryout: builder.mutation<ApiResponse<object>, TryoutDTO>({
      query: (body) => ({
        url: `UpdateTryout?id=${body.tryoutId}`,
        method: "PUT",
        body,
      }),
    }),
    deleteTryout: builder.mutation<ApiResponse<object>, number>({
      query: (id) => ({
        url: `DeleteTryout?id=${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllTryoutsQuery,
  useGetTryoutByIdQuery,
  useCreateTryoutMutation,
  useUpdateTryoutMutation,
  useDeleteTryoutMutation,
} = tryoutApi;
