import { userWithoutReviewMock as userMock } from '@/mocks/userMock';
import { rest } from 'msw';
import { cartMock } from '../cartMock';
import { productsMock } from '../productsMock';
import { reviewsMock } from '../reviewsMock';

export const handlers = [
  rest.get(`${import.meta.env.VITE_API_URL}/products`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        products: productsMock,
        totalResults: productsMock.length,
        productsPerPage: 5
      })
    );
  }),
  rest.get(`${import.meta.env.VITE_API_URL}/products/:id`, (req, res, ctx) => {
    const responseProduct = productsMock.find((product) => product._id === req.params.id);
    if (!responseProduct) return res(ctx.status(404), ctx.json(null));
    return res(ctx.status(200), ctx.json(responseProduct));
  }),
  rest.post(`${import.meta.env.VITE_API_URL}/users/register`, async (req, res, ctx) => {
    const { email } = await req.json();
    if (email === userMock.email) return res(ctx.status(409));
  }),
  rest.get(`${import.meta.env.VITE_API_URL}/reviews/product/:id`, (req, res, ctx) => {
    const responseReviews = reviewsMock.filter((review) => review.productId === req.params.id);
    return res(ctx.status(200), ctx.json(responseReviews));
  }),
  rest.get(`${import.meta.env.VITE_API_URL}/carts`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(cartMock));
  }),
];