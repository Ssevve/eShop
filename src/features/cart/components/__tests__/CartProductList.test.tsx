import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import renderWithProviders from '@/utils/renderWithProviders';
import products from '@/mocks/cartProductsMock';
import CartProductList from '../CartProductList';

describe('CartProductList component', () => {
  it('should render all products', async () => {
    renderWithProviders(
      <BrowserRouter>
        <CartProductList />
      </BrowserRouter>
    );
    expect(await screen.findAllByRole('listitem')).toHaveLength(products.length);
  });
});
