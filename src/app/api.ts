import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Product from 'types/Product';
import SortOrder from 'types/SortOrder';
import Review from 'types/Review';
import firebase from 'lib/firebaseConfig';

interface GetProductsQueryParams {
  page: number;
  category: string | null;
  sortOrder: SortOrder;
}

interface GetProductsResponse {
  products: Product[];
  totalResults: number;
  productsPerPage: number;
}

type ReviewMutationBody = Omit<Review, '_id' | 'userId' | 'userFirstName'>;

const sortQueries = {
  nameAscending: {
    sort: 'name',
    order: 1,
  },
  nameDescending: {
    sort: 'name',
    order: -1,
  },
  priceAscending: {
    sort: 'discountPrice',
    order: 1,
  },
  priceDescending: {
    sort: 'discountPrice',
    order: -1,
  },
};

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
  tagTypes: ['Product', 'Reviews', 'Products'],
  endpoints: (builder) => ({
    getProductById: builder.query<Product, string | undefined>({
      query: (id) => `products/${id}`,
      providesTags: ['Product'],
    }),
    getProducts: builder.query<GetProductsResponse, GetProductsQueryParams>({
      query: ({ page, category, sortOrder }) => {
        let queryString = `products?page=${page}&category=${category}`;

        if (sortOrder && sortQueries[sortOrder]) {
          const { sort, order } = sortQueries[sortOrder];
          queryString += `&sort=${sort}&order=${order}`;
        }

        return queryString;
      },
      providesTags: ['Products'],
    }),
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

export const { useGetProductsQuery, useGetProductByIdQuery, useGetReviewsByProductIdQuery, useAddReviewMutation, useEditReviewMutation } = api;