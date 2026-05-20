import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../baseQueryWithAuth";
import type { ProductDto } from "../../types";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query<ProductDto[], void>({
      query: () => "/api/products/GetAllProducts",
      providesTags: ["Products"],
    }),

    getProductById: builder.query<ProductDto, number>({
      query: (id) => `/api/products/GetProductById?id=${id}`,
    }),

    createProduct: builder.mutation<any, ProductDto>({
      query: (body) => ({
        url: "/api/products/CreateProduct",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation<any, { id: number; data: ProductDto }>({
      query: ({ id, data }) => ({
        url: `/api/products/UpdateProduct?id=${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation<any, number>({
      query: (id) => ({
        url: `/api/products/DeleteProduct?id=${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;