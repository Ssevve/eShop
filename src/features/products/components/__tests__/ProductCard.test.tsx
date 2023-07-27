import { productConstraints } from '@/lib/constants';
import { productsMock } from '@/mocks';
import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProductCard } from '../ProductCard';

describe('ProductCard component', () => {
  it('should render product image with correct src attribute', async () => {
    const expectedProduct = productsMock[0];
    renderWithProviders(
      <BrowserRouter>
        <ProductCard product={expectedProduct} />
      </BrowserRouter>
    );
    expect(await screen.findByAltText(expectedProduct.name)).toHaveAttribute(
      'src',
      expectedProduct.imageUrl
    );
  });

  it('should render product name', () => {
    const expectedProduct = productsMock[0];
    renderWithProviders(
      <BrowserRouter>
        <ProductCard product={expectedProduct} />
      </BrowserRouter>
    );
    expect(screen.getByText(expectedProduct.name)).toBeInTheDocument();
  });

  it('should render StarRating component', () => {
    const expectedProduct = productsMock[0];
    renderWithProviders(
      <BrowserRouter>
        <ProductCard product={expectedProduct} />
      </BrowserRouter>
    );
    expect(
      screen.getByLabelText(
        `Rating: ${expectedProduct.rating} out of ${productConstraints.rating.max} stars`
      )
    ).toBeInTheDocument();
  });

  it('should render product quantity', () => {
    const expectedProduct = productsMock[0];
    renderWithProviders(
      <BrowserRouter>
        <ProductCard product={expectedProduct} />
      </BrowserRouter>
    );
    expect(screen.getByText(`Qty: ${expectedProduct.quantity}`)).toBeInTheDocument();
  });

  it('should render product brand', () => {
    const expectedProduct = productsMock[0];
    renderWithProviders(
      <BrowserRouter>
        <ProductCard product={expectedProduct} />
      </BrowserRouter>
    );
    expect(screen.getByText(expectedProduct.brand)).toBeInTheDocument();
  });

  it('should render PriceGroup component', () => {
    const expectedProduct = productsMock[0];
    renderWithProviders(
      <BrowserRouter>
        <ProductCard product={expectedProduct} />
      </BrowserRouter>
    );
    expect(screen.getByText(`$${expectedProduct.price}`)).toBeInTheDocument();
  });

  it("should render 'add to cart' button", () => {
    const expectedProduct = productsMock[0];
    renderWithProviders(
      <BrowserRouter>
        <ProductCard product={expectedProduct} />
      </BrowserRouter>
    );
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
  });
});
