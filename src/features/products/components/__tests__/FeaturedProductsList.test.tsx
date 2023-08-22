import { productsMock } from '@/mocks';
import renderWithProviders from '@/utils/renderWithProviders';
import { screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FeaturedProductsList } from '../FeaturedProductsList';

describe('FeaturedProductsList component', () => {
  it('should render title', () => {
    const expectedTitle = 'Test title';
    renderWithProviders(
      <BrowserRouter>
        <FeaturedProductsList products={productsMock} title={expectedTitle} isError={false} />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { name: expectedTitle })).toBeInTheDocument();
  });

  it('should render <List /> component', () => {
    renderWithProviders(
      <BrowserRouter>
        <FeaturedProductsList products={productsMock} title="Test title" isError={false} />
      </BrowserRouter>
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('should render all products', () => {
    renderWithProviders(
      <BrowserRouter>
        <FeaturedProductsList products={productsMock} title="Test title" isError={false} />
      </BrowserRouter>
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(productsMock.length);
  });

  it('should not render <List /> component on error', () => {
    renderWithProviders(
      <BrowserRouter>
        <FeaturedProductsList products={productsMock} title="Test title" isError={true} />
      </BrowserRouter>
    );

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('should not render error message on error', () => {
    renderWithProviders(
      <BrowserRouter>
        <FeaturedProductsList products={productsMock} title="Test title" isError={true} />
      </BrowserRouter>
    );

    expect(screen.getByText('Product data not available.')).toBeInTheDocument();
  });
});
