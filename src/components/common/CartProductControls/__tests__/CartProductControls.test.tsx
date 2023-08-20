import { cartMock } from '@/mocks';
import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import { CartProductControls } from '../CartProductControls';

describe('CartProductControls component', () => {
  it('should render <AmountInput /> component', () => {
    const expectedProduct = cartMock.products[0];
    renderWithProviders(
      <CartProductControls
        cartId={cartMock._id}
        productAmount={expectedProduct.amount}
        productId={expectedProduct.product._id}
        productName={expectedProduct.product.name}
      />
    );
    expect(screen.getByRole('button', { name: /increase amount/i })).toBeInTheDocument();
  });

  it("should render 'delete from cart' button", () => {
    const expectedProduct = cartMock.products[0];
    renderWithProviders(
      <CartProductControls
        cartId={cartMock._id}
        productAmount={expectedProduct.amount}
        productId={expectedProduct.product._id}
        productName={expectedProduct.product.name}
      />
    );
    expect(screen.getByRole('button', { name: /remove from cart/i })).toBeInTheDocument();
  });
});
