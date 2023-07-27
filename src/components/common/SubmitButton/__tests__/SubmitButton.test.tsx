import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import { SubmitButton } from '../SubmitButton';

describe('SubmitButton component', () => {
  describe('when isLoading is false', () => {
    it('should render children', () => {
      renderWithProviders(<SubmitButton isLoading={false}>Log in</SubmitButton>);
      expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
    });

    it('should not be disabled', () => {
      renderWithProviders(<SubmitButton isLoading={false}>Log in</SubmitButton>);
      expect(screen.getByRole('button')).not.toBeDisabled();
    });
  });

  describe('when isLoading is true', () => {
    it('should render loader', () => {
      renderWithProviders(<SubmitButton isLoading>Log in</SubmitButton>);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('should be disabled', () => {
      renderWithProviders(<SubmitButton isLoading>Log in</SubmitButton>);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });
});
