import api from '@/app/services/api';

interface ResponseCartProduct {
  amount: number;
  product: {
    _id: string;
    name: string;
    discountPrice: number;
    price: number;
    imageUrl: string;
    quantity: string;
  }
}

export type ResponseCart = {
  _id: string;
  userId: string | null;
  products: ResponseCartProduct[];
  createdAt: Date;
  updatedAt?: Date;
};

export const cartsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<ResponseCart, void>({
      query: () => 'carts',
      providesTags: ['Cart'],
    }),
  }),
  overrideExisting: false,
})

export const { useLazyGetCartQuery } = cartsApi;