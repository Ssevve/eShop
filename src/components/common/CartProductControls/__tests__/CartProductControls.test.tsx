import { cartMock } from '@/mocks';
import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartProductControls } from '../CartProductControls';

describe('CartProductControls component', () => {
  it('should render <UpdateAmountTrigger /> when amount has changed', async () => {
    const expectedProduct = cartMock.products[0];
    const user = userEvent.setup();
    renderWithProviders(
      <CartProductControls
        cartId={cartMock._id}
        isFetchingCart={false}
        productAmount={expectedProduct.amount}
        productId={expectedProduct.product._id}
        productName={expectedProduct.product.name}
      />
    );
    await user.click(screen.getByRole('button', { name: /increase amount/i }));
    expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument();
  });

  it('should render <AmountInput /> component', () => {
    const expectedProduct = cartMock.products[0];
    renderWithProviders(
      <CartProductControls
        cartId={cartMock._id}
        isFetchingCart={false}
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
        isFetchingCart={false}
        productAmount={expectedProduct.amount}
        productId={expectedProduct.product._id}
        productName={expectedProduct.product.name}
      />
    );
    expect(screen.getByRole('button', { name: /remove from cart/i })).toBeInTheDocument();
  });
});
