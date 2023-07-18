import { screen } from '@testing-library/react';
import renderWithProviders from 'utils/renderWithProviders';
import productsMock from 'mocks/productsMock';
import ProductControls from '.';

describe('ProductControls', () => {
  it('should render <QuantityInput /> component', () => {
    const expectedProduct = productsMock[0];
    renderWithProviders(<ProductControls product={expectedProduct} />);
    expect(screen.getByRole('button', { name: 'Decrease quantity' })).toBeInTheDocument();
  });

  it("should render 'Add to cart' button", () => {
    const expectedProduct = productsMock[0];
    renderWithProviders(<ProductControls product={expectedProduct} />);
    expect(screen.getByRole('button', { name: 'Add to cart' })).toBeInTheDocument();
  });
});
