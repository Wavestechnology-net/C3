import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../baseQueryWithAuth";
import type { CheckoutRequestDto } from "../../types";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    checkout: builder.mutation<{ checkoutUrl: string }, CheckoutRequestDto>({
      query: (body) => ({
        url: "/api/orders/checkout",
        method: "POST",
        body,
      }),
    }),

    getOrders: builder.query<any[], void>({
      query: () => "/api/orders",
    }),
  }),
});

export const {
  useCheckoutMutation,
  useGetOrdersQuery,
} = orderApi;