import { screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import renderWithProviders from 'test/renderWithProviders';

import Logo from './Logo';

describe('Logo', () => {
  test('Renders a logo image', () => {
    renderWithProviders(<Logo />);
    expect(screen.getByTitle(/eshop/i)).toBeInTheDocument();
  });

  test('Renders a logo text', () => {
    renderWithProviders(<Logo />);
    expect(screen.getByRole('note', { name: /eshop/i })).toBeInTheDocument();
  });
});
