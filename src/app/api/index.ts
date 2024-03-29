import { auth } from '@/config/firebase';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
    prepareHeaders: async (headers) => {
      const token = await auth.currentUser?.getIdToken();
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    }
  }),
  tagTypes: ['Products', 'Reviews', 'Cart'],
  endpoints: () => ({}),
});

export default api;