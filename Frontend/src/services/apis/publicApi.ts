import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQuery';
import type { PageDto } from '../../types';
import type { ApiResponse } from './apiResponse';

export const publicApi = createApi({
  reducerPath: 'publicApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getPageBySlug: builder.query<PageDto, string>({
      query: (slug) => `/api/pages/${slug}`,
      transformResponse: (response: ApiResponse<PageDto>) => response?.data
    }),
  }),
});

export const { 
  useGetPageBySlugQuery, 
} = publicApi;