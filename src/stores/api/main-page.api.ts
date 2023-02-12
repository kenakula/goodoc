import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { CollectionResponse, DIRECTUS_ITEMS_URL } from '../assets';
import { IMainService } from '@/shared/types/main-service.type';
import { ISpecialty } from '@/shared/types/specialty.type';

export const mainPageApi = createApi({
  reducerPath: 'mainPageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: DIRECTUS_ITEMS_URL,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [],
  endpoints: builder => ({
    getServicesList: builder.query<IMainService[], void>({
      query: () => ({
        url: '/services',
        params: {
          fields: 'id, description, title, image.*',
        },
      }),
      transformResponse: (response: CollectionResponse<IMainService>) =>
        response.data,
    }),
    getSpecialtiesList: builder.query<ISpecialty[], void>({
      query: () => ({
        url: '/specialties',
      }),
      transformResponse: (response: CollectionResponse<ISpecialty>) =>
        response.data,
    }),
    getPopularSpecialtiesList: builder.query<ISpecialty[], void>({
      query: () => ({
        url: '/specialties',
        params: {
          filter: JSON.stringify({ popular: { _eq: true } }),
        },
      }),
      transformResponse: (response: CollectionResponse<ISpecialty>) =>
        response.data,
    }),
  }),
});

export const {
  useGetServicesListQuery,
  useGetSpecialtiesListQuery,
  useGetPopularSpecialtiesListQuery,
  util: { getRunningQueriesThunk },
} = mainPageApi;

export const {
  getServicesList,
  getSpecialtiesList,
  getPopularSpecialtiesList,
} = mainPageApi.endpoints;
