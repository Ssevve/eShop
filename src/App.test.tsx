import { screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import renderWithProviders from 'utils/renderWithProviders';
import mockUser from 'mocks/user';
import Status from 'types/Status';
import { App, AppWithRouter } from './App';

describe('App component', () => {
  it('should render page header', () => {
    renderWithProviders(<AppWithRouter />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should render page footer', () => {
    renderWithProviders(<AppWithRouter />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it("should render home page if path is '/'", () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /fast and reliable grocery delivery/i
    );
  });

  it('should render not found page if invalid path', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/bad-route']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/not found/i);
  });

  it("should render log in page if path is '/login'", () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  it("should render register page if path is '/register'", () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/register']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  it("should redirect to log in page if path is '/account' and user is not logged in", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/account']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
    });
  });

  it("should render account page if path is '/account' and user is logged in", async () => {
    const preloadedState = {
      auth: {
        user: {
          uid: mockUser.uid,
          email: mockUser.email,
          phoneNumber: mockUser.phoneNumber,
        },
        status: 'IDLE' as Status,
        error: {
          server: false,
          invalidCredentials: false,
          emailTaken: false,
        },
      },
    };
    renderWithProviders(
      <MemoryRouter initialEntries={['/account']}>
        <App />
      </MemoryRouter>,
      { preloadedState }
    );

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument();
    });
  });
});
