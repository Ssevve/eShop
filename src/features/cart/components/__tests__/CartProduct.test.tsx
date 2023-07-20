import products from '@/mocks/cartProductsMock';
import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartProduct } from '../CartProduct';

describe('CartProduct component', () => {
  it('should render product image with correct src attribute', async () => {
    const expectedProduct = products[0];
    renderWithProviders(
      <BrowserRouter>
        <CartProduct initialQuantity={expectedProduct.quantity} product={expectedProduct.product} />
      </BrowserRouter>
    );
    expect(await screen.findByAltText(expectedProduct.product.name)).toHaveAttribute(
      'src',
      expectedProduct.product.imageUrl
    );
  });

  it('should render product name', () => {
    const expectedProduct = products[0];
    renderWithProviders(
      <BrowserRouter>
        <CartProduct initialQuantity={expectedProduct.quantity} product={expectedProduct.product} />
      </BrowserRouter>
    );
    expect(screen.getByText(expectedProduct.product.name)).toBeInTheDocument();
  });

  it('should render PriceGroup component', () => {
    const expectedProduct = products[0];
    renderWithProviders(
      <BrowserRouter>
        <CartProduct initialQuantity={expectedProduct.quantity} product={expectedProduct.product} />
      </BrowserRouter>
    );
    expect(screen.getByText(`$${expectedProduct.product.price}`)).toBeInTheDocument();
  });

  it('should render QuantityInput component', async () => {
    const expectedProduct = products[0];
    renderWithProviders(
      <BrowserRouter>
        <CartProduct initialQuantity={expectedProduct.quantity} product={expectedProduct.product} />
      </BrowserRouter>
    );
    expect(await screen.findByRole('button', { name: 'Decrease quantity' })).toBeInTheDocument();
  });

  it("should render 'remove from cart' button", async () => {
    const expectedProduct = products[0];
    renderWithProviders(
      <BrowserRouter>
        <CartProduct initialQuantity={expectedProduct.quantity} product={expectedProduct.product} />
      </BrowserRouter>
    );
    expect(await screen.findByRole('button', { name: /remove/i })).toBeInTheDocument();
  });
});
