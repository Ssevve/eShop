import { screen, waitFor } from '@testing-library/react';
import { describe, test } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { rest } from 'msw';
import renderWithProviders from 'test/renderWithProviders';
import server from 'test/mocks/api/server';
import Product from './index';

const componentToRender = (paramId: string) => (
  <MemoryRouter initialEntries={[`/products/${paramId}`]}>
    <Routes>
      <Route path="/products/:id" element={<Product />} />
    </Routes>
  </MemoryRouter>
);

describe('Product page tests', () => {
  beforeEach(() => {});
  test('fetches product data and displays it on the page', async () => {
    renderWithProviders(componentToRender('646a2fb945f3ccc31e8e75d2'));

    expect(screen.getByLabelText('Loading')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Skin Awakening Rinse' })).toBeInTheDocument();
      expect(screen.getByLabelText('Rating: 5 out of 5 stars')).toBeInTheDocument();
      expect(screen.getByText('(23 ratings)')).toBeInTheDocument();
      expect(screen.getByText('Kaya Clinic')).toBeInTheDocument(); // Brand
      expect(screen.getByText('100 ml')).toBeInTheDocument(); // Quantity
      expect(screen.getByText('Test description')).toBeInTheDocument();
      expect(screen.getByText('$5.86')).toBeInTheDocument();
      expect(screen.getByText('$5.28')).toBeInTheDocument();
      expect(screen.queryByLabelText('Loading')).not.toBeInTheDocument();
    });
  });

  test('renders not found when product not found', async () => {
    renderWithProviders(componentToRender('bad-id'));

    expect(screen.getByLabelText('Loading')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Not Found' })).toBeInTheDocument();
      expect(screen.queryByLabelText('Loading')).not.toBeInTheDocument();
    });
  });

  test('handles server error response', async () => {
    // force msw to return error response
    server.use(
      rest.get(`${import.meta.env.VITE_API_URL}/products/:id`, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderWithProviders(componentToRender('646a2fb945f3ccc31e8e75d2'));

    expect(screen.getByLabelText('Loading')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Error!' })).toBeInTheDocument();
      expect(screen.queryByLabelText('Loading')).not.toBeInTheDocument();
    });
  });
});
