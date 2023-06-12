import { screen } from '@testing-library/react';
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

  describe('when api successfully responds with product data', () => {
    it('should product image with correct src', async () => {
      const expectedProduct = products[0];
      renderWithProviders(componentToRender());
      const image = await screen.findByAltText(expectedProduct.name);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', expectedProduct.imageUrl);
    });

    it('should render product name', async () => {
      const expectedProduct = products[0];
      renderWithProviders(componentToRender());
      expect(
        await screen.findByRole('heading', { name: expectedProduct.name })
      ).toBeInTheDocument();
    });

    it('should render product category', async () => {
      const expectedProduct = products[0];
      renderWithProviders(componentToRender());
      expect(await screen.findByText(expectedProduct.category)).toBeInTheDocument();
    });

    it('should render StarRating component', async () => {
      const expectedProduct = products[0];
      renderWithProviders(componentToRender());
      expect(
        await screen.findByText(`(${expectedProduct.ratingsCount} ratings)`)
      ).toBeInTheDocument();
    });

    it('should render product brand', async () => {
      const expectedProduct = products[0];
      renderWithProviders(componentToRender());
      expect(await screen.findByText(expectedProduct.brand)).toBeInTheDocument();
    });

    it('should render product quantity', async () => {
      const expectedProduct = products[0];
      renderWithProviders(componentToRender());
      expect(await screen.findByText(expectedProduct.quantity)).toBeInTheDocument();
    });

    it('should render product description', async () => {
      const expectedProduct = products[0];
      renderWithProviders(componentToRender());
      expect(await screen.findByText(expectedProduct.description)).toBeInTheDocument();
    });

    it('should render product description', async () => {
      const expectedProduct = products[0];
      renderWithProviders(componentToRender());
      expect(await screen.findByText(expectedProduct.description)).toBeInTheDocument();
    });

    it('should render PriceGroup component', async () => {
      const expectedProduct = products[0];
      renderWithProviders(componentToRender());
      expect(await screen.findByText(`$${expectedProduct.price}`)).toBeInTheDocument();
    });

    it('should render QuantityInput component', async () => {
      renderWithProviders(componentToRender());
      expect(await screen.findByRole('button', { name: 'Decrease quantity' })).toBeInTheDocument();
    });

    it("should render 'Add to cart' button", async () => {
      renderWithProviders(componentToRender());
      expect(await screen.findByRole('button', { name: 'Add to cart' })).toBeInTheDocument();
    });
  });
});
