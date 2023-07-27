import { productsMock } from '@/mocks';
import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProductList } from '../ProductList';

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
