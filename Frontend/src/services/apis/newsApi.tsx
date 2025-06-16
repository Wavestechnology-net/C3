import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiResponse } from "./apiResponse";

export interface NewsDTO {
  newsId?: number;
  title?: string;
  content?: string;
  createdAt?: string;
  isActive?: boolean;
}

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_API_URL}News/`,
  }),
  endpoints: (builder) => ({
    getAllNews: builder.query<ApiResponse<NewsDTO[]>, void>({
      query: () => "GetAllNews",
    }),
    getNewsById: builder.query<ApiResponse<NewsDTO>, number>({
      query: (id) => `GetNewsById?id=${id}`,
    }),
    addNews: builder.mutation<ApiResponse<object>, NewsDTO>({
      query: (body) => ({
        url: "AddNews",
        method: "POST",
        body,
      }),
    }),
    updateNews: builder.mutation<ApiResponse<void>, NewsDTO>({
      query: (body) => ({
        url: "UpdateNews",
        method: "PUT",
        body,
      }),
    }),
    deleteNews: builder.mutation<ApiResponse<void>, number>({
      query: (id) => ({
        url: `DeleteNews?id=${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllNewsQuery,
  useGetNewsByIdQuery,
  useAddNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
} = newsApi;
