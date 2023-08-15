import { productConstraints } from '@/lib/constants';
import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import { FieldError } from 'react-hook-form';
import { RatingInputGroup } from '../RatingInputGroup';

describe('RatingInputGroup component', () => {
  const expectedInputCount = productConstraints.rating.max - (productConstraints.rating.min - 1);
  it('should render correct amount of inputs', () => {
    renderWithProviders(<RatingInputGroup />);
    expect(screen.getAllByRole('radio')).toHaveLength(expectedInputCount);
  });

  it("should render error message if 'error' is provided", () => {
    const expectedError: FieldError = { type: 'min', message: 'Test error message' };
    renderWithProviders(<RatingInputGroup error={expectedError} />);
    expect(screen.getByText(expectedError.message!)).toBeInTheDocument();
  });
});
