import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQuery';
import { baseQueryWithAuth } from '../baseQueryWithAuth';
import type { ContentBlock } from '../../types';

export interface PageType {
  id: number;
  slug: string;
  title: string | null;
  createdAt: string; // ISO date string
  updatedAt: string | null;
}

export interface SectionType {
  id: number;
  pageId: number;
  name: string;
  sectionType: string;
  sortOrder: number;
  backgroundMediaId: number | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface ContentType {
  id: number;
  sectionId: number;
  contentKey: string;
  contentType: string;
  value: string | null;
  locale: string | null;
  isPublished: boolean;
  createdBy: string | null;
  createdAt: string;
  updatedAt: string | null;
  publishAt: string | null;
  metadata: string | null;
}

export const pageApi = createApi({
  reducerPath: 'pageApi',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Pages', 'Sections', 'Content', 'Page'],
  endpoints: (builder) => ({
    getPages: builder.query<PageType[], void>({
      query: () => '/api/pages',
      transformResponse: (response) => response?.data,
      providesTags: ['Pages'],
    }),
    getPageBySlug: builder.query<PageType, string>({
      query: (slug) => `/api/pages/${slug}`,
      transformResponse: (response) => response?.data,
      providesTags: (result, error, slug) => 
        result 
          ? [{ type: 'Page' as const, id: slug }]
          : [{ type: 'Page' as const, id: 'LIST' }], 
    }),
    getSectionsByPageId: builder.query<SectionType[], number>({
      query: (pageId) => `/api/pages/${pageId}/sections`,
      transformResponse: (response) => response?.data,
      providesTags: (result) => 
        result 
          ? [
              ...result.map(({ id }) => ({ type: 'Sections' as const, id })),
              { type: 'Sections', id: 'LIST' },
            ]
          : [{ type: 'Sections', id: 'LIST' }],
    }),
    getContentBySectionId: builder.query<ContentType[], number>({
      query: (sectionId) => `/api/sections/${sectionId}/content`,
      providesTags: (result) => 
        result 
          ? [
              ...result.map(({ id }) => ({ type: 'Content' as const, id })),
              { type: 'Content', id: 'LIST' },
            ]
          : [{ type: 'Content', id: 'LIST' }],
    }),
    updateSection: builder.mutation<void, { sectionId: number; content: ContentBlock[] }>({
      query: ({ sectionId, content }) => ({
        url: `/api/sections/${sectionId}`,
        method: 'PUT',
        body: { content },
      }),
      invalidatesTags: (result, error, { sectionId }) => [
        { type: 'Sections', id: sectionId }
      ],
    }),
  }),
});

export const { 
  useGetPagesQuery, 
  useGetSectionsByPageIdQuery, 
  useGetContentBySectionIdQuery,
  useUpdateSectionMutation,
  useGetPageBySlugQuery
} = pageApi;