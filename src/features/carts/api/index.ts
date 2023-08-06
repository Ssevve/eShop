import api from '@/app/services/api';
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

interface CartMutationArgs {
  cartId: string;
  productId: string;
  productName: string;
  amount: number;
}

export const cartsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<CartResponse, void>({
      query: () => 'carts',
      providesTags: ['Cart'],
    }),
    addCartProduct: builder.mutation<CartResponse, CartMutationArgs>({
      query: ({ cartId, productId, amount }) => {
        return ({
        url: `carts/${cartId}/products`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, amount }),
      })},
      invalidatesTags: (result) => result ? ['Cart'] : [],
    }),
    updateCartProductAmount: builder.mutation<CartResponse, CartMutationArgs>({
      query: ({ cartId, productId, amount }) => {
        return ({
        url: `carts/${cartId}/products/${productId}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      })},
      invalidatesTags: (result) => result ? ['Cart'] : [],
    }),
    removeCartProduct: builder.mutation<CartResponse, Omit<CartMutationArgs, 'amount'>>({
      query: ({ cartId, productId }) => {
        return ({
        url: `carts/${cartId}/products/${productId}`,
        method: 'DELETE',
      })},
      invalidatesTags: (result) => result ? ['Cart'] : [],
    }),
  }),
  overrideExisting: false,
})

export const { useLazyGetCartQuery, useAddCartProductMutation, useUpdateCartProductAmountMutation, useRemoveCartProductMutation } = cartsApi;