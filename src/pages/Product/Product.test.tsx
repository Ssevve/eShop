import { screen } from '@testing-library/react';
import { describe, test } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import renderWithProviders from 'test/renderWithProviders';
import Product from './index';

describe('Product page tests', () => {
  beforeEach(() => {});
  test('fetches product data and displays it on the page', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/products/646a2fb945f3ccc31e8e75d2']}>
        <Routes>
          <Route path="/products/:id" element={<Product />} />
        </Routes>
      </MemoryRouter>
    );

    screen.getByLabelText('Loading');

    await screen.findByRole('heading', { name: 'Skin Awakening Rinse' });
  });

  // test('handles error response', async () => {
  //   // force msw to return error response
  //   server.use(
  //     rest.get(`${import.meta.env.VITE_API_URL}/products`, (req, res, ctx) => {
  //       return res(ctx.status(500));
  //     })
  //   );

  //   renderWithProviders(<Product />);

  //   screen.getByLabelText('Loading');

  //   await screen.findByText('Not Found');
  // });
});
