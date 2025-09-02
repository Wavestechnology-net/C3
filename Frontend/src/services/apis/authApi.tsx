import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiResponse } from "./apiResponse";
import { baseQuery } from "../baseQuery";

export interface UserData {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface LoginRequestDto { username: string; password: string }
export interface AuthResponseDto { 
  token: string;
  expiresAt: Date;
  user: UserData;
 }

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<AuthResponseDto>, LoginRequestDto>({
      query: (credentials) => ({
        url: "/api/Auth/Login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
} = authApi;
