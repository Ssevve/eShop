import routes from '@/config/routes';
import { server } from '@/mocks';
import renderWithProviders from '@/utils/renderWithProviders';
import { screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

describe('ProductsPage', () => {
  it('should render page loader when fetching data', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [`/products`],
    });
    renderWithProviders(<RouterProvider router={router} />);

    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });

  it('should not render page loader when finished fetching data', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [`/products`],
    });
    renderWithProviders(<RouterProvider router={router} />);

    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument();
    });
  });

  it('should render <Filters /> component on successful api response', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [`/products`],
    });
    renderWithProviders(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /sort by/i })).toBeInTheDocument();
    });
  });

  it('should render <PaginatedProducts /> component on successful api response', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [`/products`],
    });
    renderWithProviders(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByRole('list')).toBeInTheDocument();
    });
  });

  it('should render <ErrorPage /> on error api response', async () => {
    // force msw to return error response
    server.use(
      rest.get(`${import.meta.env.VITE_API_URL}/products`, (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ data: { message: 'Mock Error Message' } }));
      })
    );

    const router = createMemoryRouter(routes, {
      initialEntries: [`/products`],
    });
    renderWithProviders(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Error!' })).toBeInTheDocument();
    });
  });
});
