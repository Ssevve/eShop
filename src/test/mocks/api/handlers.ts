import { rest } from 'msw';

const products = [
  {
    brand: 'Kaya Clinic',
    category: 'Beauty and Hygiene',
    description: 'Test description',
    discountPrice: 5.28,
    imageUrl:
      'https://www.bigbasket.com/media/uploads/p/l/40078422_3-kaya-clinic-skin-awakening-rinse.jpg',
    name: 'Skin Awakening Rinse',
    price: 5.86,
    quantity: '100 ml',
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
