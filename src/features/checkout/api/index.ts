import api from '@/app/api';

export type CheckoutResponse = {
  url: string;
};

export const checkoutApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation<CheckoutResponse, string>({
      query: (cartId) => {
        return ({
        url: `checkout`,
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartId }),
        })},
      })
    }),
    overrideExisting: false,
  });

export const { useCreateCheckoutSessionMutation } = checkoutApi;