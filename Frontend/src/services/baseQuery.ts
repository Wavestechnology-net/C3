import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from './store';

const baseUrl = import.meta.env.VITE_BASE_API_URL as string;

if (!baseUrl) {
  console.error('VITE_BASE_API_URL is not set in environment');
}

export const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});