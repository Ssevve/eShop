import { screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import renderWithProviders from 'utils/renderWithProviders';
import { App, AppWithRouter } from './App';

describe('App', () => {
  test('Renders page navigation', () => {
    renderWithProviders(<AppWithRouter />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('Renders home page if path is "/"', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /home page/i
    );
  });

  test('Renders not found page if invalid path', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/bad-route']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /not found/i
    );
  });
});
