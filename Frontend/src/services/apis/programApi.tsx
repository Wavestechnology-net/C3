import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiResponse } from "./apiResponse";

export interface ProgramDTO {
  programId?: number;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
}

export const programApi = createApi({
  reducerPath: "programApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_API_URL}Program/`,
  }),
  endpoints: (builder) => ({
    getAllPrograms: builder.query<ApiResponse<ProgramDTO[]>, void>({
      query: () => "GetAllPrograms",
    }),
    getProgramById: builder.query<ApiResponse<ProgramDTO>, number>({
      query: (id) => `GetProgramById?id=${id}`,
    }),
    addProgram: builder.mutation<ApiResponse<object>, ProgramDTO>({
      query: (body) => ({
        url: "AddProgram",
        method: "POST",
        body,
      }),
    }),
    updateProgram: builder.mutation<ApiResponse<void>, ProgramDTO>({
      query: (body) => ({
        url: "UpdateProgram",
        method: "PUT",
        body,
      }),
    }),
    deleteProgram: builder.mutation<ApiResponse<void>, number>({
      query: (id) => ({
        url: `DeleteProgram?id=${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllProgramsQuery,
  useGetProgramByIdQuery,
  useAddProgramMutation,
  useUpdateProgramMutation,
  useDeleteProgramMutation,
} = programApi;
