import { toast } from "react-toastify";
import { baseQuery } from "./baseQuery";
import { logout } from "./authSlice";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

export const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const status = result.error.status;

    if (status === 401) {
      api.dispatch(logout());

      toast.error('Your session has ended. Please log in again.');
    }

    else if (status === 403) {
      toast.error('You do not have permission to perform this action.');
    }
  }

  return result;
};