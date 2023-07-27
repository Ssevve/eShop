import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import { Price } from '../Price';

describe('Price component', () => {
  it('should render price in correct format', () => {
    const price = 5;
    renderWithProviders(<Price price={price} />);
    expect(screen.getByText('$5.00')).toBeInTheDocument();
  });

  describe('when isOld is true', () => {
    it('should render price with line through', () => {
      const price = 5;
      renderWithProviders(<Price price={price} isOld />);
      expect(screen.getByText('$5.00')).toHaveClass('line-through');
    });

    it('should render price with correct text size', () => {
      const price = 5;
      renderWithProviders(<Price price={price} isOld />);
      expect(screen.getByText('$5.00')).toHaveClass('text-base');
    });

    it('should render price with correct text color', () => {
      const price = 5;
      renderWithProviders(<Price price={price} isOld />);
      expect(screen.getByText('$5.00')).toHaveClass('text-gray-400');
    });
  });

  describe('when isNew is true', () => {
    it('should render price with correct text size', () => {
      const price = 5;
      renderWithProviders(<Price price={price} />);
      expect(screen.getByText('$5.00')).toHaveClass('text-xl');
    });
  });
});
