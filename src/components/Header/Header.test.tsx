import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import mockUser from 'mocks/user';
import Status from 'types/Status';
import renderWithProviders from 'utils/renderWithProviders';
import Header from '.';

describe('Header component', () => {
  describe('when user is not logged in', () => {
    beforeEach(() => {
      renderWithProviders(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );
    });

    it('should render logo', () => {
      expect(screen.getByTitle(/eshop/i)).toBeInTheDocument();
    });

    it('should render page navigation', () => {
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('should render log in page link', () => {
      expect(screen.getByRole('link', { name: /log in/i })).toBeInTheDocument();
    });

    it('should render cart page link', () => {
      expect(screen.getByRole('link', { name: /cart/i })).toBeInTheDocument();
    });
  });

  describe('when user is logged in', () => {
    const status: Status = 'IDLE';
    const preloadedState = {
      auth: {
        user: mockUser,
        status,
        error: null,
      },
    };

    beforeEach(() => {
      renderWithProviders(
        <BrowserRouter>
          <Header />
        </BrowserRouter>,
        { preloadedState }
      );
    });

    it('should render logo', () => {
      expect(screen.getByTitle(/eshop/i)).toBeInTheDocument();
    });

    it('should render page navigation', () => {
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('should render account page link', () => {
      expect(screen.getByRole('link', { name: /account/i })).toBeInTheDocument();
    });

    it('should enders cart page link', () => {
      expect(screen.getByRole('link', { name: /cart/i })).toBeInTheDocument();
    });
  });
});
