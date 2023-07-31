import { cartProductsMock } from '@/mocks';
import { calculateCartTotal, calculateOriginalPrice } from '@/utils/calculate';
import { formatPrice } from '@/utils/format';
import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartPage } from '../CartPage';

describe('CartPage', () => {
  it('should render heading element', () => {
    const preloadedState = {
      cart: {
        products: cartProductsMock,
      },
    };
    const productCount = cartProductsMock.reduce((count, curr) => count + curr.amount, 0);
    renderWithProviders(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>,
      { preloadedState }
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(`Cart (${productCount})`);
  });

  it("should render 'clear cart' button", () => {
    renderWithProviders(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>
    );
    expect(screen.getByRole('button', { name: /clear cart/i })).toBeInTheDocument();
  });

  it('should render CartProductList component if there are products in the cart', () => {
    const preloadedState = {
      cart: {
        products: cartProductsMock,
      },
    };
    renderWithProviders(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>,
      { preloadedState }
    );
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it("should render 'empty cart' message if there are no products in the cart", () => {
    renderWithProviders(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>
    );
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    expect(screen.getByText('Your cart is empty!')).toBeInTheDocument();
  });

  it('should render original order price', () => {
    const preloadedState = {
      cart: {
        products: cartProductsMock,
      },
    };
    const originalPrice = calculateOriginalPrice(cartProductsMock);
    renderWithProviders(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>,
      { preloadedState }
    );
    expect(screen.getByText(formatPrice(originalPrice))).toBeInTheDocument();
  });

  it('should render total order price', () => {
    const preloadedState = {
      cart: {
        products: cartProductsMock,
      },
    };
    const totalPrice = calculateCartTotal(cartProductsMock);
    renderWithProviders(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>,
      { preloadedState }
    );
    expect(screen.getByText(formatPrice(totalPrice))).toBeInTheDocument();
  });

  it('should render total discount value', () => {
    const preloadedState = {
      cart: {
        products: cartProductsMock,
      },
    };
    const originalPrice = calculateOriginalPrice(cartProductsMock);
    const totalPrice = calculateCartTotal(cartProductsMock);
    const discount = originalPrice - totalPrice;
    renderWithProviders(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>,
      { preloadedState }
    );
    expect(screen.getByText(formatPrice(discount))).toBeInTheDocument();
  });

  it("should render 'checkout' button", () => {
    renderWithProviders(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>
    );
    expect(screen.getByRole('button', { name: /checkout/i })).toBeInTheDocument();
  });
});
