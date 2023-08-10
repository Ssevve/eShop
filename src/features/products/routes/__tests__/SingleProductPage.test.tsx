import routes from '@/config/routes';
import { server } from '@/mocks/api/server';
import { productsMock } from '@/mocks/productsMock';
import renderWithProviders from '@/utils/renderWithProviders';
import { screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

describe('SingleProductPage', () => {
  it('should render page loader when fetching data', () => {
    const expectedProduct = productsMock[0];
    const router = createMemoryRouter(routes, {
      initialEntries: [`/products/${expectedProduct._id}`],
    });
    renderWithProviders(<RouterProvider router={router} />);

    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });

  it('should not render page loader when finished fetching data', async () => {
    const expectedProduct = productsMock[0];
    const router = createMemoryRouter(routes, {
      initialEntries: [`/products/${expectedProduct._id}`],
    });
    renderWithProviders(<RouterProvider router={router} />);

    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument();
    });
  });

  it('should render <NotFoundPage /> when product was not found', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [`/products/bad-id`],
    });
    renderWithProviders(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
    });
  });

  it('should render <ErrorPage /> on error api response', async () => {
    // force msw to return error response
    server.use(
      rest.get(`${import.meta.env.VITE_API_URL}/products/:id`, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    const expectedProduct = productsMock[0];
    const router = createMemoryRouter(routes, {
      initialEntries: [`/products/${expectedProduct._id}`],
    });
    renderWithProviders(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Error!' })).toBeInTheDocument();
    });
  });

  describe('when api successfully responds with product data', () => {
    it('should render <ProductDetails /> component', async () => {
      const expectedProduct = productsMock[0];
      const router = createMemoryRouter(routes, {
        initialEntries: [`/products/${expectedProduct._id}`],
      });
      renderWithProviders(<RouterProvider router={router} />);

      await waitFor(() => {
        expect(
          screen.getByRole('heading', { level: 1, name: expectedProduct.name })
        ).toBeInTheDocument();
      });
    });

    it('should render <ProductReviews /> component', async () => {
      const expectedProduct = productsMock[0];
      const router = createMemoryRouter(routes, {
        initialEntries: [`/products/${expectedProduct._id}`],
      });
      renderWithProviders(<RouterProvider router={router} />);

      await waitFor(() => {
        expect(screen.getByRole('heading', { level: 2, name: /reviews/i })).toBeInTheDocument();
      });
    });
  });
});
