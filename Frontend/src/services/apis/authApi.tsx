import { createApi } from "@reduxjs/toolkit/query/react";
import type { ApiResponse } from "./apiResponse";
import { baseQuery } from "../baseQuery";

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface RegisterRequestDto {
  username: string;
  email: string;
  password: string;
}
export interface UserData {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface AuthResponseDto {
  token: string;
  refreshToken: string;
  expiresAt: string;
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


    register: builder.mutation<AuthResponseDto, RegisterRequestDto>({
      query: (body) => ({
        url: "/api/Auth/Register",
        method: "POST",
        body,
      }),
    }),

    googleLogin: builder.mutation<AuthResponseDto, { idToken: string }>({
      query: (body) => ({
        url: "/api/Auth/google-login",
        method: "POST",
        body,
      }),
    }),

    forgotPassword: builder.mutation<
      { message: string },
      { email: string }
    >({
      query: (body) => ({
        url: "/api/Auth/forgot-password",
        method: "POST",
        body,
      }),
    }),

    resetPassword: builder.mutation<
      { message: string },
      {
        email: string;
        token: string;
        newPassword: string;
      }
    >({
      query: (body) => ({
        url: "/api/Auth/reset-password",
        method: "POST",
        body,
      }),
    }),

    refreshToken: builder.mutation<
      AuthResponseDto,
      { refreshToken: string }
    >({
      query: (body) => ({
        url: "/api/Auth/refresh-token",
        method: "POST",
        body,
      }),
    }),

    logout: builder.mutation<
      { message: string },
      void
    >({
      query: () => ({
        url: "/api/Auth/logout",
        method: "POST",
      }),
    }),

  })
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useGoogleLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
} = authApi;
