import { cartMock, userWithReviewMock } from '@/mocks';
import renderWithProviders from '@/utils/renderWithProviders';
import { screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartProductEntity } from '../CartProductEntity';
import { AuthStatus } from '@/features/auth';

describe('CartProductEntity component', () => {
  it('should render product image with correct src attribute', async () => {
    const status: AuthStatus = 'IDLE';
    const preloadedState = {
      auth: {
        user: userWithReviewMock,
        status,
        error: null,
      },
    };
    const expectedProduct = cartMock.products[0];
    renderWithProviders(
      <BrowserRouter>
        <CartProductEntity
          id={expectedProduct.product._id}
          name={expectedProduct.product.name}
          price={expectedProduct.product.price}
          discountPrice={expectedProduct.product.discountPrice}
          imageUrl={expectedProduct.product.imageUrl}
          amount={expectedProduct.amount}
          cartId={cartMock._id}
          isFetchingCart={false}
        />
      </BrowserRouter>,
      { preloadedState }
    );
    await waitFor(() => {
      expect(screen.getByAltText(expectedProduct.product.name)).toHaveAttribute(
        'src',
        expectedProduct.product.imageUrl
      );
    });
  });

  it('should render product name', async () => {
    const status: AuthStatus = 'IDLE';
    const preloadedState = {
      auth: {
        user: userWithReviewMock,
        status,
        error: null,
      },
    };
    const expectedProduct = cartMock.products[0];
    renderWithProviders(
      <BrowserRouter>
        <CartProductEntity
          id={expectedProduct.product._id}
          name={expectedProduct.product.name}
          price={expectedProduct.product.price}
          discountPrice={expectedProduct.product.discountPrice}
          imageUrl={expectedProduct.product.imageUrl}
          amount={expectedProduct.amount}
          cartId={cartMock._id}
          isFetchingCart={false}
        />
      </BrowserRouter>,
      { preloadedState }
    );
    await waitFor(() => {
      expect(screen.getByText(expectedProduct.product.name)).toBeInTheDocument();
    });
  });

  it('should render PriceGroup component', async () => {
    const status: AuthStatus = 'IDLE';
    const preloadedState = {
      auth: {
        user: userWithReviewMock,
        status,
        error: null,
      },
    };
    const expectedProduct = cartMock.products[0];
    renderWithProviders(
      <BrowserRouter>
        <CartProductEntity
          id={expectedProduct.product._id}
          name={expectedProduct.product.name}
          price={expectedProduct.product.price}
          discountPrice={expectedProduct.product.discountPrice}
          imageUrl={expectedProduct.product.imageUrl}
          amount={expectedProduct.amount}
          cartId={cartMock._id}
          isFetchingCart={false}
        />
      </BrowserRouter>,
      { preloadedState }
    );
    await waitFor(() => {
      expect(screen.getByText(`$${expectedProduct.product.price}`)).toBeInTheDocument();
    });
  });

  it('should render <AmountInput /> component', async () => {
    const status: AuthStatus = 'IDLE';
    const preloadedState = {
      auth: {
        user: userWithReviewMock,
        status,
        error: null,
      },
    };
    const expectedProduct = cartMock.products[0];
    renderWithProviders(
      <BrowserRouter>
        <CartProductEntity
          id={expectedProduct.product._id}
          name={expectedProduct.product.name}
          price={expectedProduct.product.price}
          discountPrice={expectedProduct.product.discountPrice}
          imageUrl={expectedProduct.product.imageUrl}
          amount={expectedProduct.amount}
          cartId={cartMock._id}
          isFetchingCart={false}
        />
      </BrowserRouter>,
      { preloadedState }
    );
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Decrease amount' })).toBeInTheDocument();
    });
  });

  it("should render 'remove from cart' button", async () => {
    const status: AuthStatus = 'IDLE';
    const preloadedState = {
      auth: {
        user: userWithReviewMock,
        status,
        error: null,
      },
    };
    const expectedProduct = cartMock.products[0];
    renderWithProviders(
      <BrowserRouter>
        <CartProductEntity
          id={expectedProduct.product._id}
          name={expectedProduct.product.name}
          price={expectedProduct.product.price}
          discountPrice={expectedProduct.product.discountPrice}
          imageUrl={expectedProduct.product.imageUrl}
          amount={expectedProduct.amount}
          cartId={cartMock._id}
          isFetchingCart={false}
        />
      </BrowserRouter>,
      { preloadedState }
    );
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /remove from cart/i })).toBeInTheDocument();
    });
  });
});
