import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Category from 'types/Category';
import Product from 'types/Product';
import SortOrder from 'types/SortOrder';

interface GetProductsQueryArgs {
  page: number;
  category: Category;
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
  reducerPath: 'productsApi',
  endpoints: (builder) => ({
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
  }),
});

export const { useGetProductsQuery } = api;
