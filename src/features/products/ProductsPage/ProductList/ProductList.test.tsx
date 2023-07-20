import productsMock from '@/mocks/productsMock';
import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductList from '.';

describe('ProductList component', () => {
  it('should render all products', async () => {
    renderWithProviders(
      <BrowserRouter>
        <ProductList products={productsMock} />
      </BrowserRouter>
    );
    expect(await screen.findAllByRole('listitem')).toHaveLength(productsMock.length);
  });
});
