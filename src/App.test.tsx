import { screen, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import renderWithProviders from 'utils/renderWithProviders';
import mockUser from 'mocks/user';
import Status from 'types/Status';
import App from './App';
import routesConfig from 'config/routes';

describe('App component', () => {
  it('should render page header', () => {
    renderWithProviders(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should render page footer', () => {
    renderWithProviders(<App />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});

it("should render home page if path is '/'", () => {
  const router = createMemoryRouter(routesConfig, {
    initialEntries: ['/'],
  });
  renderWithProviders(<RouterProvider router={router} />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    /fast and reliable grocery delivery/i
  );
});

it('should render not found page if invalid path', () => {
  const router = createMemoryRouter(routesConfig, {
    initialEntries: ['/bad-route'],
  });
  renderWithProviders(<RouterProvider router={router} />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('404');
});

it("should render log in page if path is '/login'", () => {
  const router = createMemoryRouter(routesConfig, {
    initialEntries: ['/login'],
  });
  renderWithProviders(<RouterProvider router={router} />);
  expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
});

it("should render register page if path is '/register'", () => {
  const router = createMemoryRouter(routesConfig, {
    initialEntries: ['/register'],
  });
  renderWithProviders(<RouterProvider router={router} />);
  expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
});

it("should redirect to log in page if path is '/account' and user is not logged in", async () => {
  const router = createMemoryRouter(routesConfig, {
    initialEntries: ['/account'],
  });
  renderWithProviders(<RouterProvider router={router} />);

  await waitFor(() => {
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });
});

it("should render account page if path is '/account' and user is logged in", async () => {
  const status: Status = 'IDLE';
  const preloadedState = {
    auth: {
      user: mockUser,
      status,
      error: null,
    },
  };
  const router = createMemoryRouter(routesConfig, {
    initialEntries: ['/login'],
  });
  renderWithProviders(<RouterProvider router={router} />, { preloadedState });

  await waitFor(() => {
    expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument();
  });
});
