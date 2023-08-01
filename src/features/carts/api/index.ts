import api from '@/app/services/api';
import { CartProduct } from '../types';

export type CartResponse = {
  _id: string;
  userId: string | null;
  products: CartProduct[];
  createdAt: Date;
  updatedAt?: Date;
  totalProductAmount: number;
};


export const cartsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<CartResponse, void>({
      query: () => 'carts',
      providesTags: ['Cart'],
    }),

  }),
  overrideExisting: false,
})

export const { useLazyGetCartQuery } = cartsApi;