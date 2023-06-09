import { screen } from '@testing-library/react';
import renderWithProviders from 'utils/renderWithProviders';
import SubmitButton from '.';

describe('SubmitButton component', () => {
  describe('when isLoading is false', () => {
    const submitButton = <SubmitButton text="Log in" isLoading={false} />;

    it('should render correct text', () => {
      renderWithProviders(submitButton);
      expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
    });

    it('should not be disabled', () => {
      renderWithProviders(submitButton);
      expect(screen.getByRole('button')).not.toBeDisabled();
    });
  });

  describe('when isLoading is true', () => {
    const submitButton = <SubmitButton text="Log in" isLoading />;

    it('should render loader', () => {
      renderWithProviders(submitButton);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('should be disabled', () => {
      renderWithProviders(submitButton);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });
});
