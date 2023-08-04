import api from '@/app/services/api';
import { Product } from '@/features/products';
import { CartProduct } from '../types';

export type CartResponse = {
  _id: string;
  userId: string | null;
  products: CartProduct[];
  createdAt: Date;
  updatedAt?: Date;
  totalProductAmount: number;
  originalPrice: number;
  totalDiscount: number;
  finalPrice: number;
};

interface AddCartProductArgs {
  cartId: string;
  product: Product;
  amount: number;
}

export const cartsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<CartResponse, void>({
      query: () => 'carts',
      providesTags: ['Cart'],
    }),
    addCartProduct: builder.mutation<CartResponse, AddCartProductArgs>({
      query: ({ cartId, product, amount }) => {
        return ({
        url: `carts/${cartId}/products`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: product._id, amount }),
      })},
      invalidatesTags: (result) => result ? ['Cart'] : [],
    }),
  }),
  overrideExisting: false,
})

export const { useLazyGetCartQuery, useAddCartProductMutation } = cartsApi;