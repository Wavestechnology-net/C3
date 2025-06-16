import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiResponse } from "./apiResponse";

export interface StaffDTO {
  staffId?: number;
  fullName: string;
  position?: string;
  contactNumber?: string;
  email?: string;
  isActive?: boolean;
}

export const staffApi = createApi({
  reducerPath: "staffApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_API_URL}Staff/`,
  }),
  endpoints: (builder) => ({
    getAllStaff: builder.query<ApiResponse<StaffDTO[]>, void>({
      query: () => "GetAllStaff",
    }),
    getStaffById: builder.query<ApiResponse<StaffDTO>, number>({
      query: (id) => `GetStaffById?id=${id}`,
    }),
    addStaff: builder.mutation<ApiResponse<object>, StaffDTO>({
      query: (body) => ({
        url: "AddStaff",
        method: "POST",
        body,
      }),
    }),
    updateStaff: builder.mutation<ApiResponse<void>, StaffDTO>({
      query: (body) => ({
        url: "UpdateStaff",
        method: "PUT",
        body,
      }),
    }),
    deleteStaff: builder.mutation<ApiResponse<void>, number>({
      query: (id) => ({
        url: `DeleteStaff?id=${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllStaffQuery,
  useGetStaffByIdQuery,
  useAddStaffMutation,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
} = staffApi;
