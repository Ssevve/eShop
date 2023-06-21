import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import renderWithProviders from 'utils/renderWithProviders';
import products from 'mocks/cartProducts';
import CartProductList from '.';

describe('ProductList component', () => {
  it('should render all products', async () => {
    renderWithProviders(
      <BrowserRouter>
        <CartProductList products={products} />
      </BrowserRouter>
    );
    expect(await screen.findAllByRole('listitem')).toHaveLength(products.length);
  });
});
