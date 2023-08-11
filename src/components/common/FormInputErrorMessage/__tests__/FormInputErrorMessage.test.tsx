import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import { FormInputErrorMessage } from '../FormInputErrorMessage';

describe('FormInputErrorMessage component', () => {
  it('should render message correctly', () => {
    renderWithProviders(<FormInputErrorMessage message="test message" />);
    expect(screen.getByText('test message')).toBeInTheDocument();
  });
});
