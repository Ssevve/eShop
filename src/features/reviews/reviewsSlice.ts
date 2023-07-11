import apiSlice from '../api/apiSlice'

export type Review = {
  _id: string;
  userFirstName: string;
  productId: string;
  userId: string;
  message?: string;
  rating: number;
}

type GetReviewsByProductIdReqParams = string | undefined;
type CreateReviewReqBody = { productId: string; rating: number; message?: string; };
type EditReviewReqBody = {_id: string; rating: number; message?: string; };

type ReviewsErrorResBody = { status: number; data: { message: string; } }

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviewsByProductId: builder.query<Review[], GetReviewsByProductIdReqParams>({
      query: (productId) => `reviews/${productId}`,
      providesTags: [{ type: 'Reviews', id: 'LIST' }],
    }),
    createReview: builder.mutation<Review, CreateReviewReqBody>({
      query: (body) => {
        return ({
        url: 'reviews',
        method: 'POST',
        body,
      })},
      transformErrorResponse: (
        response: ReviewsErrorResBody
        ) => ({
          status: response.status,
          data: response.data.message,
        }),
      invalidatesTags: (result) => {
        console.log(result);
        return result ? [
        { type: 'Reviews', id: 'LIST' },
        { type: 'Products', id: result.productId }
      ] : []},
    }),
    editReview: builder.mutation<Review, EditReviewReqBody>({
      query: (body) => ({
        url: 'reviews',
        method: 'PUT',
        body,
      }),
      transformErrorResponse: (
        response: ReviewsErrorResBody
        ) => ({
          status: response.status,
          data: response.data.message,
        }),
      // @ts-ignore
      invalidatesTags: (result) => result ? [     
        { type: 'Reviews', id: 'LIST' },
        { type: 'Products', id: result.productId }
      ] : [],
    }),
  }),
  overrideExisting: false,
})

export const { useGetReviewsByProductIdQuery, useCreateReviewMutation, useEditReviewMutation } = extendedApiSlice;