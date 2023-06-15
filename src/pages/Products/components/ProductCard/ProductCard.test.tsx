import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import renderWithProviders from 'utils/renderWithProviders';
import products from 'mocks/products';
import ProductCard from '.';
import { MAX_PRODUCT_RATING } from 'lib/constants';

describe('ProductCard component', () => {
  it('should product image with correct src', async () => {
    const expectedProduct = products[0];
    renderWithProviders(
      <BrowserRouter>
        <ProductCard product={expectedProduct} />
      </BrowserRouter>
    );
    const image = await screen.findByAltText(expectedProduct.name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expectedProduct.imageUrl);
  });

  it('should render product category', () => {
    const expectedProduct = products[0];
    renderWithProviders(
      <BrowserRouter>
        <ProductCard product={expectedProduct} />
      </BrowserRouter>
    );
    expect(screen.getByText(expectedProduct.category)).toBeInTheDocument();
  });

  it('should render product name', () => {
    const expectedProduct = products[0];
    renderWithProviders(
      <BrowserRouter>
        <ProductCard product={expectedProduct} />
      </BrowserRouter>
    );
    expect(screen.getByText(expectedProduct.name)).toBeInTheDocument();
  });

  it('should render StarRating component', () => {
    const expectedProduct = products[0];
    renderWithProviders(
      <BrowserRouter>
        <ProductCard product={expectedProduct} />
      </BrowserRouter>
    );
    expect(
      screen.getByLabelText(`Rating: ${expectedProduct.rating} out of ${MAX_PRODUCT_RATING} stars`)
    ).toBeInTheDocument();
  });

  it('should render product quantity', () => {
    const expectedProduct = products[0];
    renderWithProviders(
      <BrowserRouter>
        <ProductCard product={expectedProduct} />
      </BrowserRouter>
    );
    expect(screen.getByText(`Qty: ${expectedProduct.quantity}`)).toBeInTheDocument();
  });

  it('should render product brand', () => {
    const expectedProduct = products[0];
    renderWithProviders(
      <BrowserRouter>
        <ProductCard product={expectedProduct} />
      </BrowserRouter>
    );
    expect(screen.getByText(expectedProduct.brand)).toBeInTheDocument();
  });

  it('should render PriceGroup component', () => {
    const expectedProduct = products[0];
    renderWithProviders(
      <BrowserRouter>
        <ProductCard product={expectedProduct} />
      </BrowserRouter>
    );
    expect(screen.getByText(`$${expectedProduct.price}`)).toBeInTheDocument();
  });

  it("should render 'add to cart' button", () => {
    const expectedProduct = products[0];
    renderWithProviders(
      <BrowserRouter>
        <ProductCard product={expectedProduct} />
      </BrowserRouter>
    );
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
  });
});
