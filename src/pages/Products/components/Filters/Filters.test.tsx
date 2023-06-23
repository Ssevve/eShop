import { BrowserRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import renderWithProviders from 'utils/renderWithProviders';
import Filters from '.';

describe('Filters component', () => {
  it('should render SortSelect component', () => {
    renderWithProviders(
      <BrowserRouter>
        <Filters />
      </BrowserRouter>
    );
    expect(screen.getByRole('button', { name: /sort by/i })).toBeInTheDocument();
  });
});
