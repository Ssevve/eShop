import renderWithProviders from '@/utils/renderWithProviders';
import { screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FeaturedProducts } from '../FeaturedProducts';

describe('FeaturedProducts component', () => {
  it('should render all featured lists', async () => {
    renderWithProviders(
      <BrowserRouter>
        <FeaturedProducts />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByRole('list')).toHaveLength(3);
    });
  });
});
