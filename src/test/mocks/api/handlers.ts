import { rest } from 'msw';

const products = [
  {
    brand: 'Test brand',
    category: 'Test category',
    description: 'Test description',
    discountPrice: 5.28,
    imageUrl: 'Test image url',
    name: 'Test product',
    price: 5.86,
    quantity: 'Test quantity',
    rating: 5,
    ratingsCount: 23,
    _id: '646a2fb945f3ccc31e8e75d2',
  },
];

const handlers = [
  rest.get(`${import.meta.env.VITE_API_URL}/products/:id`, (req, res, ctx) => {
    const responseProduct = products.find((product) => product._id === req.params.id);
    if (!responseProduct) return res(ctx.status(404), ctx.json(null));
    return res(ctx.status(200), ctx.json(responseProduct));
  }),
];

export default handlers;
