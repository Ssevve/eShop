import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Product from 'types/Product';
import SortOrder from 'types/SortOrder';
import Review from 'types/Review';

interface GetProductsQueryArgs {
  page: number;
  category: string | null;
  sortOrder: SortOrder;
}

interface GetProductsResponse {
  products: Product[];
  totalResults: number;
  productsPerPage: number;
}

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
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  reducerPath: 'api',
  tagTypes: ['Product', 'Reviews'],
  endpoints: (builder) => ({
    getProductById: builder.query<Product, string | undefined>({
      query: (id) => `products/${id}`,
      providesTags: ['Product'],
    }),
    getProducts: builder.query<GetProductsResponse, GetProductsQueryArgs>({
      query: ({ page, category, sortOrder }) => {
        let queryString = `products?page=${page}&category=${category}`;

        if (sortOrder && sortQueries[sortOrder]) {
          const { sort, order } = sortQueries[sortOrder];
          queryString += `&sort=${sort}&order=${order}`;
        }

        return queryString;
      },
    }),
    getReviewsByProductId: builder.query<Review[], string | undefined>({
      query: (productId) => `reviews/${productId}`,
      providesTags: ['Reviews'],
    }),
    addReview: builder.mutation<Review, Omit<Review, '_id'>>({
      query: (body) => ({
        url: 'reviews',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Product', 'Reviews'],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useGetReviewsByProductIdQuery, useAddReviewMutation } = api;