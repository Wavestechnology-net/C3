import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiResponse } from "./apiResponse";

export interface TeamDTO {
  teamId?: number;
  name: string;
  coachName?: string;
  ageGroup?: string;
  isActive?: boolean;
}

export const teamApi = createApi({
  reducerPath: "teamApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_API_URL}Team/`,
  }),
  endpoints: (builder) => ({
    getAllTeams: builder.query<ApiResponse<TeamDTO[]>, void>({
      query: () => "GetAllTeams",
    }),
    getTeamById: builder.query<ApiResponse<TeamDTO>, number>({
      query: (id) => `GetTeamById?id=${id}`,
    }),
    addTeam: builder.mutation<ApiResponse<object>, TeamDTO>({
      query: (body) => ({
        url: "AddTeam",
        method: "POST",
        body,
      }),
    }),
    updateTeam: builder.mutation<ApiResponse<void>, TeamDTO>({
      query: (body) => ({
        url: "UpdateTeam",
        method: "PUT",
        body,
      }),
    }),
    deleteTeam: builder.mutation<ApiResponse<void>, number>({
      query: (id) => ({
        url: `DeleteTeam?id=${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllTeamsQuery,
  useGetTeamByIdQuery,
  useAddTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
} = teamApi;
