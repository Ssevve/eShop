import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PaginationLink } from '../PaginationLink';

describe('PaginationLink component', () => {
  it('should render with correct label', () => {
    const expectedLabel = '1';
    renderWithProviders(
      <BrowserRouter>
        <PaginationLink label={expectedLabel} currentPage={1} page={1} />
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: expectedLabel })).toBeInTheDocument();
  });

  it('should render render with correct classnames if is not active', () => {
    renderWithProviders(
      <BrowserRouter>
        <PaginationLink label={2} currentPage={1} page={2} />
      </BrowserRouter>
    );
    expect(screen.getByRole('link')).not.toHaveClass('bg-primary');
    expect(screen.getByRole('link')).not.toHaveClass('text-white');
    expect(screen.getByRole('link')).not.toHaveClass('hover:bg-primary');
    expect(screen.getByRole('link')).toHaveClass('hover:bg-gray-400');
  });

  it('should render render with correct classnames if is active', () => {
    renderWithProviders(
      <BrowserRouter>
        <PaginationLink label={1} currentPage={1} page={1} />
      </BrowserRouter>
    );
    expect(screen.getByRole('link')).not.toHaveClass('hover:bg-gray-400');
    expect(screen.getByRole('link')).toHaveClass('bg-primary');
    expect(screen.getByRole('link')).toHaveClass('text-white');
    expect(screen.getByRole('link')).toHaveClass('hover:bg-primary');
  });
});
