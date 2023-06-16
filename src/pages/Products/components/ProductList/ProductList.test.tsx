import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import renderWithProviders from 'utils/renderWithProviders';
import products from 'mocks/products';
import ProductList from '.';

describe('ProductList component', () => {
  it('should render all products', async () => {
    renderWithProviders(
      <BrowserRouter>
        <ProductList products={products} />
      </BrowserRouter>
    );
    expect(await screen.findAllByRole('listitem')).toHaveLength(products.length);
  });
});
