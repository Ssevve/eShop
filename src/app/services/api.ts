import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import auth from 'config/firebase';

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: async (headers) => {
      const token = await auth.currentUser?.getIdToken();
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    }
  }),
  tagTypes: ['Products', 'Reviews'],
  endpoints: () => ({}),
});

export default api;