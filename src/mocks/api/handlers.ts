import { rest } from 'msw';
import products from '../products';
import mockUser from 'mocks/user';

const handlers = [
  rest.get(`${import.meta.env.VITE_API_URL}/products/:id`, (req, res, ctx) => {
    const responseProduct = products.find((product) => product._id === req.params.id);
    if (!responseProduct) return res(ctx.status(404), ctx.json(null));
    return res(ctx.status(200), ctx.json(responseProduct));
  }),
  rest.post(`${import.meta.env.VITE_API_URL}/users/register`, async (req, res, ctx) => {
    const { email } = await req.json();
    if (email === mockUser.email) return res(ctx.status(409));
  }),
];

export default handlers;
