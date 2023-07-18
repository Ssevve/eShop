import { screen } from '@testing-library/react';
import { MemoryRouter, RouterProvider, createMemoryRouter } from 'react-router-dom';
import { rest } from 'msw';
import renderWithProviders from 'utils/renderWithProviders';
import server from 'mocks/api/server';
import products from 'mocks/products';
import routesConfig from 'config/routes';
import SingleProductPage from '.';

describe('SingleProductPage', () => {
  it('should render page loader when fetching data', () => {
    const expectedProduct = products[0];
    renderWithProviders(
      <MemoryRouter initialEntries={[`/products/${expectedProduct._id}`]}>
        <SingleProductPage />
      </MemoryRouter>
    );
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('should not render page loader when not fetching data', async () => {
    const expectedProduct = products[0];
    const router = createMemoryRouter(routesConfig, {
      initialEntries: [`/products/${expectedProduct._id}`],
    });
    renderWithProviders(<RouterProvider router={router} />);
    expect(await screen.findByLabelText('Loading')).not.toBeInTheDocument();
  });

  it('should render <NotFoundPage /> when product was not found', async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: [`/products/bad-id`],
    });
    renderWithProviders(<RouterProvider router={router} />);
    expect(await screen.findByRole('heading', { name: '404' })).toBeInTheDocument();
  });

  it('should render <ErrorPage /> on error api response', async () => {
    // force msw to return error response
    server.use(
      rest.get(`${import.meta.env.VITE_API_URL}/products/:id`, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    const expectedProduct = products[0];
    const router = createMemoryRouter(routesConfig, {
      initialEntries: [`/products/${expectedProduct._id}`],
    });
    renderWithProviders(<RouterProvider router={router} />);
    expect(await screen.findByRole('heading', { name: 'Error!' })).toBeInTheDocument();
  });

  describe('when api successfully responds with product data', () => {
    it('should render <Product /> component', async () => {
      const expectedProduct = products[0];
      const router = createMemoryRouter(routesConfig, {
        initialEntries: [`/products/${expectedProduct._id}`],
      });
      renderWithProviders(<RouterProvider router={router} />);
      expect(
        await screen.findByRole('heading', { level: 1, name: expectedProduct.name })
      ).toBeInTheDocument();
    });

    it('should render <ProductReviews /> component', async () => {
      const expectedProduct = products[0];
      const router = createMemoryRouter(routesConfig, {
        initialEntries: [`/products/${expectedProduct._id}`],
      });
      renderWithProviders(<RouterProvider router={router} />);
      expect(
        await screen.findByRole('heading', { level: 2, name: /reviews/i })
      ).toBeInTheDocument();
    });
  });
});
