import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiResponse } from "./apiResponse";

export interface ProgramRegistrationDTO {
  registrationId?: number;
  programId: number;
  playerName: string;
  contactNumber: string;
  email?: string;
  registeredAt?: string;
}

export const programRegistrationApi = createApi({
  reducerPath: "programRegistrationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_API_URL}ProgramRegistration/`,
  }),
  endpoints: (builder) => ({
    getRegistrationsByProgram: builder.query<ApiResponse<ProgramRegistrationDTO[]>, number>({
      query: (programId) => `GetRegistrationsByProgram?programId=${programId}`,
    }),
    registerProgram: builder.mutation<ApiResponse<object>, ProgramRegistrationDTO>({
      query: (body) => ({
        url: `Register?programId=${body.programId}`,
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
  useGetRegistrationsByProgramQuery,
  useRegisterProgramMutation,
  useDeleteRegistrationMutation,
} = programRegistrationApi;
