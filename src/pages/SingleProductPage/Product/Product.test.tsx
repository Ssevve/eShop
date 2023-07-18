import { screen } from '@testing-library/react';
import renderWithProviders from 'utils/renderWithProviders';
import productsMock from 'mocks/productsMock';
import Product from '.';

describe('Product', () => {
  it('should render product image with correct src attribute', () => {
    const expectedProduct = productsMock[0];
    renderWithProviders(<Product product={expectedProduct} />);
    expect(screen.getByAltText(expectedProduct.name)).toHaveAttribute(
      'src',
      expectedProduct.imageUrl
    );
  });

  it('should render product name', () => {
    const expectedProduct = productsMock[0];
    renderWithProviders(<Product product={expectedProduct} />);
    expect(screen.getByRole('heading', { name: expectedProduct.name })).toBeInTheDocument();
  });

  it('should render product category', () => {
    const expectedProduct = productsMock[0];
    renderWithProviders(<Product product={expectedProduct} />);
    expect(screen.getByText(expectedProduct.category)).toBeInTheDocument();
  });

  it('should render <StarRating /> component', () => {
    const expectedProduct = productsMock[0];
    renderWithProviders(<Product product={expectedProduct} />);
    expect(screen.getByText(`(${expectedProduct.ratingsCount} ratings)`)).toBeInTheDocument();
  });

  it('should render product brand', () => {
    const expectedProduct = productsMock[0];
    renderWithProviders(<Product product={expectedProduct} />);
    expect(screen.getByText(expectedProduct.brand)).toBeInTheDocument();
  });

  it('should render product quantity', () => {
    const expectedProduct = productsMock[0];
    renderWithProviders(<Product product={expectedProduct} />);
    expect(screen.getByText(expectedProduct.quantity)).toBeInTheDocument();
  });

  it('should render product description', () => {
    const expectedProduct = productsMock[0];
    renderWithProviders(<Product product={expectedProduct} />);
    expect(screen.getByText(expectedProduct.description)).toBeInTheDocument();
  });

  it('should render <PriceGroup /> component', () => {
    const expectedProduct = productsMock[0];
    renderWithProviders(<Product product={expectedProduct} />);
    expect(screen.getByText(`$${expectedProduct.price}`)).toBeInTheDocument();
  });

  it('should render <ProductControls /> component', () => {
    const expectedProduct = productsMock[0];
    renderWithProviders(<Product product={expectedProduct} />);
    expect(screen.getByRole('button', { name: 'Decrease quantity' })).toBeInTheDocument();
  });
});
