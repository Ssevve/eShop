import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import firebase from 'lib/firebaseConfig';

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: async (headers) => {
      const token = await firebase.currentUser?.getIdToken();
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    }
  }),
  tagTypes: ['Products', 'Reviews'],
  endpoints: () => ({}),
});

export  default apiSlice;