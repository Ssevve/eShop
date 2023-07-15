import api from './api'
import { Product } from './products';

export interface Review {
  _id: string;
  userFirstName: string;
  productId: string;
  userId: string;
  message?: string;
  rating: number;
}

interface CreateReviewArgs {
  productId: string;
  rating: number;
  message?: string;
}

interface CreateReviewResBody {
  created: {
    review: Review;
  },
  updated: {
    product: Product;
  }
}

interface EditReviewArgs {
  reviewId: string;
  productId: string;
  rating: number;
  message?: string;
}

interface EditReviewResBody {
  updated: {
    review: Review;
    product: Product
  }
};

interface ReviewsErrorResBody {
  status: number;
  data: {
    message: string;
  }
}

const reviewsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getReviewsByProductId: builder.query<Review[] | undefined, string | undefined>({
      query: (productId) => `reviews/product/${productId}`,
      // @ts-ignore
      providesTags: (reviews) => 
      reviews
        ? [
            ...reviews.map(( { _id } ) => ({ type: 'Reviews', id: _id })),
            { type: 'Reviews', id: 'LIST' },
          ]
        : [{ type: 'Reviews', id: 'LIST' }],
    }),
    getReviewsByUserId: builder.query<Review[] | undefined, string | undefined>({
      query: (userId) => `reviews/user/${userId}`,
      // @ts-ignore
      providesTags: (reviews) => 
      reviews
        ? [
            ...reviews.map(( { _id } ) => ({ type: 'Reviews', id: _id })),
            { type: 'Reviews', id: 'LIST' },
          ]
        : [{ type: 'Reviews', id: 'LIST' }],
    }),
    createReview: builder.mutation<CreateReviewResBody, CreateReviewArgs>({
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
        { type: 'Products', id: result.updated.product._id }
      ] : []},
    }),
    editReview: builder.mutation<EditReviewResBody, EditReviewArgs>({
      query: ({ reviewId, productId, rating, message}) => ({
        url: `reviews/${reviewId}/${productId}`,
        method: 'PUT',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify({ rating, message }),
      }),
      transformErrorResponse: (
        response: ReviewsErrorResBody
        ) => ({
          status: response.status,
          data: response.data.message,
        }),
      invalidatesTags: (result) => result ? [     
        { type: 'Reviews', id: 'LIST' },
        { type: 'Products', id: result.updated.product._id }
      ] : [],
    }),
  }),
  overrideExisting: false,
})

export const { useGetReviewsByProductIdQuery, useGetReviewsByUserIdQuery, useCreateReviewMutation, useEditReviewMutation } = reviewsApi;