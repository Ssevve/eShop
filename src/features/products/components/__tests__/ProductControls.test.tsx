import { productsMock } from '@/mocks';
import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import { ProductControls } from '../ProductControls';

describe('ProductControls', () => {
  it('should render <AmountInput /> component', () => {
    const expectedProduct = productsMock[0];
    renderWithProviders(<ProductControls product={expectedProduct} />);
    expect(screen.getByRole('button', { name: 'Decrease amount' })).toBeInTheDocument();
  });

  it("should render 'Add to cart' button", () => {
    const expectedProduct = productsMock[0];
    renderWithProviders(<ProductControls product={expectedProduct} />);
    expect(screen.getByRole('button', { name: 'Add to cart' })).toBeInTheDocument();
  });
});
