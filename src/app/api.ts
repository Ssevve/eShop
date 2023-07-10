import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Review from 'types/Review';
import firebase from 'lib/firebaseConfig';

type ReviewMutationBody = Omit<Review, '_id' | 'userId' | 'userFirstName'>;

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: async (headers) => {
      const token = await firebase.currentUser?.getIdToken();
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),
  reducerPath: 'api',
  endpoints: (builder) => ({
    
    getReviewsByProductId: builder.query<Review[], string | undefined>({
      query: (productId) => `reviews/${productId}`,
      providesTags: ['Reviews'],
    }),
    addReview: builder.mutation<void, ReviewMutationBody>({
      query: (body) => {        
        return ({
        url: 'reviews',
        method: 'POST',
        body,
      })},
      invalidatesTags: ['Product', 'Reviews', 'Products'],
    }),
    editReview: builder.mutation<void, ReviewMutationBody>({
      query: (body) => ({
        url: 'reviews',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Product', 'Reviews', 'Products'],
    }),
  }),
});

export const { useGetReviewsByProductIdQuery, useAddReviewMutation, useEditReviewMutation } = api;