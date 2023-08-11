import { productConstraints } from '@/lib/constants';
import { productsMock } from '@/mocks';
import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PaginatedProducts } from '../PaginatedProducts';

describe('PaginatedProducts component', () => {
  it('should render <List /> component', () => {
    renderWithProviders(
      <BrowserRouter>
        <PaginatedProducts
          products={productsMock}
          currentPage={1}
          productsPerPage={1}
          totalResults={1}
        />
      </BrowserRouter>
    );
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('should render all products', () => {
    renderWithProviders(
      <BrowserRouter>
        <PaginatedProducts
          products={productsMock}
          currentPage={1}
          productsPerPage={1}
          totalResults={1}
        />
      </BrowserRouter>
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(productsMock.length);
  });

  it('should render <Pagination /> component', () => {
    renderWithProviders(
      <BrowserRouter>
        <PaginatedProducts
          products={productsMock}
          currentPage={1}
          productsPerPage={1}
          totalResults={22}
        />
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: /page 1/i })).toBeInTheDocument();
  });
});
