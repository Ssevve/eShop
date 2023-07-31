import { cartProductsMock } from '@/mocks';
import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartProduct } from '../CartProduct';

describe('CartProduct component', () => {
  it('should render product image with correct src attribute', async () => {
    const expectedProduct = cartProductsMock[0];
    renderWithProviders(
      <BrowserRouter>
        <CartProduct initialAmount={expectedProduct.amount} product={expectedProduct.product} />
      </BrowserRouter>
    );
    expect(await screen.findByAltText(expectedProduct.product.name)).toHaveAttribute(
      'src',
      expectedProduct.product.imageUrl
    );
  });

  it('should render product name', () => {
    const expectedProduct = cartProductsMock[0];
    renderWithProviders(
      <BrowserRouter>
        <CartProduct initialAmount={expectedProduct.amount} product={expectedProduct.product} />
      </BrowserRouter>
    );
    expect(screen.getByText(expectedProduct.product.name)).toBeInTheDocument();
  });

  it('should render PriceGroup component', () => {
    const expectedProduct = cartProductsMock[0];
    renderWithProviders(
      <BrowserRouter>
        <CartProduct initialAmount={expectedProduct.amount} product={expectedProduct.product} />
      </BrowserRouter>
    );
    expect(screen.getByText(`$${expectedProduct.product.price}`)).toBeInTheDocument();
  });

  it('should render <AmountInput /> component', async () => {
    const expectedProduct = cartProductsMock[0];
    renderWithProviders(
      <BrowserRouter>
        <CartProduct initialAmount={expectedProduct.amount} product={expectedProduct.product} />
      </BrowserRouter>
    );
    expect(await screen.findByRole('button', { name: 'Decrease amount' })).toBeInTheDocument();
  });

  it("should render 'remove from cart' button", async () => {
    const expectedProduct = cartProductsMock[0];
    renderWithProviders(
      <BrowserRouter>
        <CartProduct initialAmount={expectedProduct.amount} product={expectedProduct.product} />
      </BrowserRouter>
    );
    expect(await screen.findByRole('button', { name: /remove/i })).toBeInTheDocument();
  });
});
