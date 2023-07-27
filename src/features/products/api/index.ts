import api from '@/app/services/api';
import { Category } from '@/features/categories';
import { Product } from '@/features/products';
import { Order, Sort } from '@/types';

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
      // @ts-ignore
      providesTags: ({ products }: GetProductsResponse) => 
      products
        ? [
            ...products.map(( { _id } ) => ({ type: 'Products', id: _id })),
            { type: 'Products', id: 'LIST' },
          ]
        : [{ type: 'Products', id: 'LIST' }],
    }),
    getProductById: builder.query<Product, GetProductByIdReqParams>({
      query: (id) => `products/${id}`,
      providesTags: (result, err, arg) => [{ type: 'Products', id: arg }],
    }),
  }),
  overrideExisting: false,
})

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;