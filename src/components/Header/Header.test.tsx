import { screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

import renderWithProviders from 'utils/renderWithProviders';
import { RootState } from 'app/store';
import Header from '.';

describe('Header', () => {
  describe('If user is not logged in', () => {
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

    test('Renders log in page link', () => {
      renderWithProviders(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );
      expect(screen.getByRole('link', { name: /log in/i })).toBeInTheDocument();

      test('Renders cart page link', () => {
        renderWithProviders(
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        );
        expect(screen.getByRole('link', { name: /cart/i })).toBeInTheDocument();
      });
    });
  });
  describe('If user is logged in', () => {
    const preloadedState: RootState = {
      auth: {
        user: {
          uid: '2',
          email: 'test@test.test',
          phoneNumber: null,
        },
        status: 'IDLE',
        error: {
          server: false,
          invalidCredentials: false,
        },
      },
      products: {
        products: [],
        status: 'IDLE',
      },
    };
    test('Renders logo', () => {
      renderWithProviders(
        <BrowserRouter>
          <Header />
        </BrowserRouter>,
        { preloadedState }
      );
      expect(screen.getByRole('note', { name: /eshop/i })).toBeInTheDocument();
    });

    test('Renders page navigation', () => {
      renderWithProviders(
        <BrowserRouter>
          <Header />
        </BrowserRouter>,
        { preloadedState }
      );
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    test('Renders account page link', () => {
      renderWithProviders(
        <BrowserRouter>
          <Header />
        </BrowserRouter>,
        { preloadedState }
      );
      expect(
        screen.getByRole('link', { name: /account/i })
      ).toBeInTheDocument();
    });

    test('Renders cart page link', () => {
      renderWithProviders(
        <BrowserRouter>
          <Header />
        </BrowserRouter>,
        { preloadedState }
      );
      expect(screen.getByRole('link', { name: /cart/i })).toBeInTheDocument();
    });
  });
});
