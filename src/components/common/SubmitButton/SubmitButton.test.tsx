import { screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import renderWithProviders from 'utils/renderWithProviders';
import SubmitButton from './SubmitButton';

describe('Submit button', () => {
  describe('With isLoading equal to false', () => {
    const submitButton = <SubmitButton text="Log in" isLoading={false} />;

    test('Renders a correct text', () => {
      renderWithProviders(submitButton);
      expect(
        screen.getByRole('button', { name: /log in/i })
      ).toBeInTheDocument();
    });

    test('Is not disabled', () => {
      renderWithProviders(submitButton);
      expect(screen.getByRole('button')).not.toBeDisabled();
    });
  });

  describe('With isLoading equal to true', () => {
    const submitButton = <SubmitButton text="Log in" isLoading />;

    test('Renders loader', () => {
      renderWithProviders(submitButton);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    test('Is disabled', () => {
      renderWithProviders(submitButton);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });
});
