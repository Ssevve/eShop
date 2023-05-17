import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Category from 'types/Category';
import Product from 'types/Product';
import SortOrder from 'types/SortOrder';

interface GetProductsQueryArgs {
  page: number;
  category: Category;
  limit: number;
  sortOrder: SortOrder;
}

interface GetProductsResponse {
  products: Product[];
  totalResults: number;
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
  reducerPath: 'productsApi',
  endpoints: (builder) => ({
    getProducts: builder.query<GetProductsResponse, GetProductsQueryArgs>({
      query: ({ page, category, limit, sortOrder }) => {
        let queryString = `products?page=${page}&category=${category}&limit=${limit}`;

        if (sortOrder && sortQueries[sortOrder]) {
          const { sort, order } = sortQueries[sortOrder];
          queryString += `&sort=${sort}&order=${order}`;
        }

        return queryString;
      },
    }),
  }),
});

export const { useGetProductsQuery } = api;
