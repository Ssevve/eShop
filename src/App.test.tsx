import routes from '@/config/routes';
import { AuthStatus } from '@/features/auth';
import { userWithoutReviewMock as userMock } from '@/mocks/userMock';
import renderWithProviders from '@/utils/renderWithProviders';
import { screen, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { App } from './App';

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
  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
  });
  renderWithProviders(<RouterProvider router={router} />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    /fast and reliable grocery delivery/i
  );
});

it('should render not found page if invalid path', () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ['/bad-route'],
  });
  renderWithProviders(<RouterProvider router={router} />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('404');
});

it("should render log in page if path is '/login'", () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ['/login'],
  });
  renderWithProviders(<RouterProvider router={router} />);
  expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
});

it("should render register page if path is '/register'", () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ['/register'],
  });
  renderWithProviders(<RouterProvider router={router} />);
  expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
});

it("should redirect to log in page if path is '/dashboard' and user is not logged in", async () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ['/dashboard'],
  });
  renderWithProviders(<RouterProvider router={router} />);

  await waitFor(() => {
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });
});

it("should render dashboard page if path is '/dashboard' and user is logged in", async () => {
  const status: AuthStatus = 'IDLE';
  const preloadedState = {
    auth: {
      user: userMock,
      status,
      error: null,
    },
  };
  const router = createMemoryRouter(routes, {
    initialEntries: ['/login'],
  });
  renderWithProviders(<RouterProvider router={router} />, { preloadedState });

  await waitFor(() => {
    expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument();
  });
});
