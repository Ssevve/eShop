import { screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { rest } from 'msw';
import renderWithProviders from 'utils/renderWithProviders';
import server from 'mocks/api/server';
import products from 'mocks/products';
import Product from '.';

const componentToRender = (paramId = products[0]._id) => (
  <MemoryRouter initialEntries={[`/products/${paramId}`]}>
    <Routes>
      <Route path="/products/:id" element={<Product />} />
    </Routes>
  </MemoryRouter>
);

describe('Product page', () => {
  it('should render page loader when fetching data', () => {
    renderWithProviders(componentToRender());
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('should not render page loader when not fetching data', async () => {
    renderWithProviders(componentToRender());
    expect(await screen.findByLabelText('Loading')).not.toBeInTheDocument();
  });

  it('should correctly render product data', async () => {
    const expectedProduct = products[0];
    renderWithProviders(componentToRender());
    await waitFor(() => {
      const image = screen.getByAltText('Test product');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'Test image url');

      expect(screen.getByRole('heading', { name: expectedProduct.name })).toBeInTheDocument();
      expect(screen.getByText('Test category')).toBeInTheDocument();
      expect(
        screen.getByLabelText(`Rating: ${expectedProduct.rating} out of 5 stars`)
      ).toBeInTheDocument();
      expect(screen.getByText(`(${expectedProduct.ratingsCount} ratings)`)).toBeInTheDocument();
      expect(screen.getByText(expectedProduct.brand)).toBeInTheDocument();
      expect(screen.getByText(expectedProduct.quantity)).toBeInTheDocument();
      expect(screen.getByText(expectedProduct.description)).toBeInTheDocument();

      const priceGroupComponent = screen.getByText(`$${expectedProduct.price}`);
      expect(priceGroupComponent).toBeInTheDocument();

      const quantityInputComponent = screen.getByRole('button', { name: 'Decrease quantity' });
      expect(quantityInputComponent).toBeInTheDocument();

      expect(screen.getByRole('button', { name: 'Add to cart' })).toBeInTheDocument();
    });
  });

  it('should render <NotFound /> when product was not found', async () => {
    renderWithProviders(componentToRender('bad-id'));
    expect(await screen.findByRole('heading', { name: 'Not Found' })).toBeInTheDocument();
  });

  it('should render <Error /> on error api response', async () => {
    // force msw to return error response
    server.use(
      rest.get(`${import.meta.env.VITE_API_URL}/products/:id`, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderWithProviders(componentToRender());
    expect(await screen.findByRole('heading', { name: 'Error!' })).toBeInTheDocument();
  });
});
