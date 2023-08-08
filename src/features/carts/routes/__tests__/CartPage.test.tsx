import { AuthStatus } from '@/features/auth';
import { cartMock, userWithReviewMock } from '@/mocks';
import { formatPrice } from '@/utils/format';
import renderWithProviders from '@/utils/renderWithProviders';
import { screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartPage } from '../CartPage';

describe('CartPage', () => {
  it('should render heading element', () => {
    const status: AuthStatus = 'IDLE';
    const preloadedState = {
      auth: {
        user: userWithReviewMock,
        status,
        error: null,
      },
    };
    renderWithProviders(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>,
      { preloadedState }
    );

    waitFor(() => {
      expect(
        screen.getByRole('heading', { level: 1, name: `Cart (${cartMock.totalProductAmount})` })
      ).toBeInTheDocument();
    });
  });

  it("should render 'clear cart' button", () => {
    renderWithProviders(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>
    );
    expect(screen.getByRole('button', { name: /clear cart/i })).toBeInTheDocument();
  });

  it('should render product list', () => {
    const status: AuthStatus = 'IDLE';
    const preloadedState = {
      auth: {
        user: userWithReviewMock,
        status,
        error: null,
      },
    };
    renderWithProviders(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>,
      { preloadedState }
    );

    waitFor(() => {
      expect(screen.getByRole('list')).toBeInTheDocument();
    });
  });

  it('should render original order price', () => {
    const status: AuthStatus = 'IDLE';
    const preloadedState = {
      auth: {
        user: userWithReviewMock,
        status,
        error: null,
      },
    };
    renderWithProviders(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>,
      { preloadedState }
    );
    waitFor(() => {
      expect(screen.getByText(formatPrice(cartMock.originalPrice))).toBeInTheDocument();
    });
  });

  it('should render total discount value', () => {
    const status: AuthStatus = 'IDLE';
    const preloadedState = {
      auth: {
        user: userWithReviewMock,
        status,
        error: null,
      },
    };
    renderWithProviders(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>,
      { preloadedState }
    );
    waitFor(() => {
      expect(screen.getByText(formatPrice(cartMock.totalDiscount))).toBeInTheDocument();
    });
  });

  it('should render final order price', () => {
    const status: AuthStatus = 'IDLE';
    const preloadedState = {
      auth: {
        user: userWithReviewMock,
        status,
        error: null,
      },
    };
    renderWithProviders(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>,
      { preloadedState }
    );
    waitFor(() => {
      expect(screen.getByText(formatPrice(cartMock.finalPrice))).toBeInTheDocument();
    });
  });

  it("should render 'checkout' link", () => {
    renderWithProviders(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: /checkout/i })).toBeInTheDocument();
  });
});
