import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import { Logo } from '../Logo';

describe('Logo component', () => {
  it('should render logo image', () => {
    renderWithProviders(<Logo />);
    expect(screen.getByTitle(/eshop/i)).toBeInTheDocument();
  });

  it('should render logo text', () => {
    renderWithProviders(<Logo />);
    expect(screen.getByRole('note')).toBeInTheDocument();
  });
});
