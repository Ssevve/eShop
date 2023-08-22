import { productConstraints } from '@/lib/constants';
import { productsMock } from '@/mocks';
import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FeaturedProductCard } from '../FeaturedProductCard';

describe('FeaturedProductCard component', () => {
  it("should render a link to product's page", () => {
    const expectedProduct = productsMock[0];
    renderWithProviders(
      <BrowserRouter>
        <FeaturedProductCard product={expectedProduct} />
      </BrowserRouter>
    );
    expect(screen.getByRole('link')).toHaveAttribute('href', `/products/${expectedProduct._id}`);
  });

  it('should render product image with correct src attribute', () => {
    const expectedProduct = productsMock[0];
    renderWithProviders(
      <BrowserRouter>
        <FeaturedProductCard product={expectedProduct} />
      </BrowserRouter>
    );
    expect(screen.getByAltText(expectedProduct.name)).toHaveAttribute(
      'src',
      expectedProduct.imageUrl
    );
  });

  it('should render product name', () => {
    const expectedProduct = productsMock[0];
    renderWithProviders(
      <BrowserRouter>
        <FeaturedProductCard product={expectedProduct} />
      </BrowserRouter>
    );
    expect(screen.getByText(expectedProduct.name)).toBeInTheDocument();
  });

  it('should render StarRating component', () => {
    const expectedProduct = productsMock[0];
    renderWithProviders(
      <BrowserRouter>
        <FeaturedProductCard product={expectedProduct} />
      </BrowserRouter>
    );
    expect(
      screen.getByLabelText(
        `Rating: ${expectedProduct.rating} out of ${productConstraints.rating.max} stars`
      )
    ).toBeInTheDocument();
  });

  it('should render PriceGroup component', () => {
    const expectedProduct = productsMock[0];
    renderWithProviders(
      <BrowserRouter>
        <FeaturedProductCard product={expectedProduct} />
      </BrowserRouter>
    );
    expect(screen.getByText(`$${expectedProduct.price}`)).toBeInTheDocument();
  });
});
