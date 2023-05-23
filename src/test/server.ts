import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fetch, Headers, Request, Response } from 'cross-fetch';

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;

const handlers = [
  rest.get(
    `${import.meta.env.VITE_API_URL}/products/646a2fb945f3ccc31e8e75d2`,
    (req, res, ctx) => {
      const mockApiResponse = {
        brand: 'Kaya Clinic',
        category: 'Beauty and Hygiene',
        description:
          'Specially formulated by kaya dermatologists, skin awakening rinse is a multi-vitamin shimmering cleanser that is designed to wash away make-up and impurities without altering skins natural moisture balance.',
        discountPrice: 5.28,
        imageUrl:
          'https://www.bigbasket.com/media/uploads/p/l/40078422_3-kaya-clinic-skin-awakening-rinse.jpg',
        name: 'Skin Awakening Rinse',
        price: 5.86,
        quantity: '100 ml',
        rating: 5,
        ratingsCount: 23,
        _id: '646a2fb945f3ccc31e8e75d2',
      };
      return res(ctx.status(200), ctx.json(mockApiResponse));
    }
  ),
];

export default setupServer(...handlers);
