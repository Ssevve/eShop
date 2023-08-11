import { AuthState } from '@/features/auth';
import { userWithReviewMock } from '@/mocks';
import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { UserDropdown } from '../UserDropdown';

describe('UserDropdown component', () => {
  it("should not render menu if 'isOpen' is false", () => {
    const openMock = vi.fn();
    const closeMock = vi.fn();
    const logoutMock = vi.fn();
    renderWithProviders(
      <BrowserRouter>
        <UserDropdown logout={logoutMock} isOpen={false} open={openMock} close={closeMock} />
      </BrowserRouter>
    );
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it("should render menu if 'isOpen' is true", () => {
    const openMock = vi.fn();
    const closeMock = vi.fn();
    const logoutMock = vi.fn();
    renderWithProviders(
      <BrowserRouter>
        <UserDropdown logout={logoutMock} isOpen={true} open={openMock} close={closeMock} />
      </BrowserRouter>
    );
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('should show correct label if user is not logged in', () => {
    const openMock = vi.fn();
    const closeMock = vi.fn();
    const logoutMock = vi.fn();
    renderWithProviders(
      <BrowserRouter>
        <UserDropdown logout={logoutMock} isOpen={false} open={openMock} close={closeMock} />
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: /log in/i })).toBeInTheDocument();
  });

  it('should show correct menu if user is not logged in', () => {
    const openMock = vi.fn();
    const closeMock = vi.fn();
    const logoutMock = vi.fn();
    renderWithProviders(
      <BrowserRouter>
        <UserDropdown logout={logoutMock} isOpen={true} open={openMock} close={closeMock} />
      </BrowserRouter>
    );
    expect(screen.getAllByRole('link', { name: /log in/i })).toHaveLength(2);
    expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument();
  });

  it('should show correct label if user is logged in', () => {
    const preloadedState = {
      auth: {
        user: userWithReviewMock,
        status: 'IDLE',
        error: null,
      } satisfies AuthState,
    };
    const openMock = vi.fn();
    const closeMock = vi.fn();
    const logoutMock = vi.fn();
    renderWithProviders(
      <BrowserRouter>
        <UserDropdown logout={logoutMock} isOpen={false} open={openMock} close={closeMock} />
      </BrowserRouter>,
      { preloadedState }
    );
    expect(screen.getByRole('link', { name: /account/i })).toBeInTheDocument();
  });

  it('should show correct menu if user is logged in', () => {
    const preloadedState = {
      auth: {
        user: userWithReviewMock,
        status: 'IDLE',
        error: null,
      } satisfies AuthState,
    };
    const openMock = vi.fn();
    const closeMock = vi.fn();
    const logoutMock = vi.fn();
    renderWithProviders(
      <BrowserRouter>
        <UserDropdown logout={logoutMock} isOpen={true} open={openMock} close={closeMock} />
      </BrowserRouter>,
      { preloadedState }
    );
    expect(screen.getByRole('link', { name: /profile/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /reviews/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument();
  });

  it('should open on mouse enter', async () => {
    const openMock = vi.fn();
    const closeMock = vi.fn();
    const logoutMock = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(
      <BrowserRouter>
        <UserDropdown logout={logoutMock} isOpen={false} open={openMock} close={closeMock} />
      </BrowserRouter>
    );

    await user.hover(screen.getByRole('link', { name: /log in/i }));
    expect(openMock).toHaveBeenCalledTimes(1);
  });

  it('should close on mouse leave', async () => {
    const openMock = vi.fn();
    const closeMock = vi.fn();
    const logoutMock = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(
      <BrowserRouter>
        <UserDropdown logout={logoutMock} isOpen={false} open={openMock} close={closeMock} />
      </BrowserRouter>
    );

    const dropdownTrigger = screen.getByRole('link', { name: /log in/i });

    await user.hover(dropdownTrigger);
    await user.unhover(dropdownTrigger);
    expect(closeMock).toHaveBeenCalledTimes(1);
  });
});
