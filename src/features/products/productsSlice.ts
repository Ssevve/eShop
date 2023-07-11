import { Sort, Order } from 'types/SortOption';
import apiSlice from '../api/apiSlice'
import Category from 'types/Category';

export interface Product {
  _id: string;
  name: string;
  brand: string;
  price: number;
  discountPrice: number;
  imageUrl: string;
  quantity: string;
  category: string;
  rating: number;
  ratingsCount: number;
  description: string;
}

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

const extendedApiSlice = apiSlice.injectEndpoints({
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

export const { useGetProductsQuery, useGetProductByIdQuery } = extendedApiSlice;