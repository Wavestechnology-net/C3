import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiResponse } from "./apiResponse";
import { baseQuery } from "../baseQuery";

// DTOs
export interface MediaDTO {
  id?: number;
  fileName?: string;
  mediaUrl?: string;
  mediaType?: string;
  altText?: string;
  createdAt?: string;
}

export interface MediaUploadDTO {
  file: File;
  altText: string;
}

export const mediaApi = createApi({
  reducerPath: "mediaApi",
  baseQuery,
  endpoints: (builder) => ({
      getAllMedia: builder.query<ApiResponse<MediaDTO[]>, void>({
        query: () => "/api/media/GetAllMedia",
      }),

    getMediaById: builder.query<ApiResponse<MediaDTO>, number>({
      query: (id) => `/api/media/GetMediaById?id=${id}`,
    }),

    uploadMedia: builder.mutation<ApiResponse<MediaDTO>, MediaUploadDTO>({
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
