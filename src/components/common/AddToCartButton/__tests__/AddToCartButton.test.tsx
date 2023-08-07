import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import { AddToCartButton } from '../AddToCartButton';

describe('AddToCartButton component', () => {
  it('should render correctly', () => {
    renderWithProviders(
      <AddToCartButton
        amount={4}
        cartId="testCartId"
        isFetchingCart={false}
        productId="testProductId"
        productName="testProduct"
      />
    );
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
  });

  it('should not show loader when not fetching cart', () => {
    renderWithProviders(
      <AddToCartButton
        amount={4}
        cartId="testCartId"
        isFetchingCart={false}
        productId="testProductId"
        productName="testProduct"
      />
    );
    expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument();
  });

  it('should show loader when fetching cart', () => {
    renderWithProviders(
      <AddToCartButton
        amount={4}
        cartId="testCartId"
        isFetchingCart={true}
        productId="testProductId"
        productName="testProduct"
      />
    );
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });
});
