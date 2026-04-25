import { createApi } from "@reduxjs/toolkit/query/react";
import type { ApiResponse } from "./apiResponse";
import { baseQueryWithAuth } from "../baseQueryWithAuth";
import type { MediaDto, MediaUploadDto } from "../../types";

export const mediaApi = createApi({
  reducerPath: "mediaApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
      getAllMedia: builder.query<ApiResponse<MediaDto[]>, void>({
        query: () => "/api/media/GetAllMedia",
      }),

    getMediaById: builder.query<ApiResponse<MediaDto>, number>({
      query: (id) => `/api/media/GetMediaById?id=${id}`,
    }),

    uploadMedia: builder.mutation<ApiResponse<MediaDto>, MediaUploadDto>({
      query: ({ file, altText }) => {
        const formData = new FormData();
        formData.append("File", file);
        if (altText) formData.append("AltText", altText);

        return {
          url: "/api/media/UploadMedia",
          method: "POST",
          body: formData,
        };
      },
    }),

    deleteMedia: builder.mutation<ApiResponse<void>, number>({
      query: (id) => ({
        url: `/api/media/DeleteMedia?id=${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetMediaByIdQuery,
  useUploadMediaMutation,
  useDeleteMediaMutation,
  useGetAllMediaQuery
} = mediaApi;
