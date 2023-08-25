import api from '@/app/api';
import { Category } from '@/features/categories';
import { Order, Sort } from '@/features/filters';
import { Product } from '@/features/products';


interface GetProductsQueryParams {
  page: number;
  category: Category;
  sort: Sort;
  order: Order;
}

interface GetProductsResponse {
  products: Product[];
  totalResults: number;
  productsPerPage: number;
}

type GetProductByIdReqParams = string | undefined;

const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<GetProductsResponse, GetProductsQueryParams>({
      query: ({ page, category, sort, order }) => {
        return `products?page=${page}&category=${category}&sort=${sort}&order=${order}`;
      },
      providesTags: (result) =>
      result
        ? [
            ...result.products.map(( { _id } ) => ({ type: 'Products' as const, id: _id })),
            { type: 'Products', id: 'LIST' },
          ]
        : [{ type: 'Products', id: 'LIST' }],
    }),
    getProductById: builder.query<Product, GetProductByIdReqParams>({
      query: (id) => `products/${id}`,
      providesTags: (result, err, arg) => [{ type: 'Products' as const, id: arg }],
    }),
  }),
  overrideExisting: false,
})

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;