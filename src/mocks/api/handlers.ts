import { rest } from 'msw';
import products from '../products';

const handlers = [
  rest.get(`${import.meta.env.VITE_API_URL}/products/:id`, (req, res, ctx) => {
    const responseProduct = products.find((product) => product._id === req.params.id);
    if (!responseProduct) return res(ctx.status(404), ctx.json(null));
    return res(ctx.status(200), ctx.json(responseProduct));
  }),
];

export default handlers;
