import { screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

import renderWithProviders from 'utils/renderWithProviders';
import Header from './Header';

describe('Header', () => {
  test('Renders logo', () => {
    renderWithProviders(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByRole('note', { name: /eshop/i })).toBeInTheDocument();
  });

  test('Renders page navigation', () => {
    renderWithProviders(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('Renders account page link', () => {
    renderWithProviders(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: 'Account' })).toBeInTheDocument();
  });

  test('Renders cart page link', () => {
    renderWithProviders(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: 'Cart' })).toBeInTheDocument();
  });
});
