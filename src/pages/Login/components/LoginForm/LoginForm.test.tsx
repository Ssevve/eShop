// @vitest-environment jsdom
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithProviders from 'utils/renderWithProviders';
import LoginForm from '.';

vi.mock('firebase/auth', () => {
  return {
    getAuth: vi.fn(),
    signInWithEmailAndPassword: vi.fn().mockReturnValue({}),
  };
});

describe('LoginForm component', () => {
  beforeEach(() => {
    renderWithProviders(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
  });

  it('should show error message if email is not valid', async () => {
    const userCredentials = {
      email: 'bademail',
      password: 'testpassword',
    };
    const user = userEvent.setup();
    await user.type(screen.getByRole('textbox', { name: 'Email' }), userCredentials.email);
    await user.type(screen.getByLabelText('Password'), userCredentials.password);
    await user.click(screen.getByRole('button', { name: 'Log in' }));

    expect(signInWithEmailAndPassword).not.toHaveBeenCalled();
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('should show error message when password is too short', async () => {
    const userCredentials = {
      email: 'user@email.com',
      password: '2',
    };
    const user = userEvent.setup();
    await user.type(screen.getByRole('textbox', { name: 'Email' }), userCredentials.email);
    await user.type(screen.getByLabelText('Password'), userCredentials.password);
    await user.click(screen.getByRole('button', { name: 'Log in' }));

    expect(signInWithEmailAndPassword).not.toHaveBeenCalled();
    expect(screen.getByText('Minimum password length is 6')).toBeInTheDocument();
  });

  it('should show error messages when user was not found', async () => {
    const userCredentials = {
      email: 'user@email.com',
      password: 'testpassword',
    };
    const user = userEvent.setup();
    await user.type(screen.getByRole('textbox', { name: 'Email' }), userCredentials.email);
    await user.type(screen.getByLabelText('Password'), userCredentials.password);
    await user.click(screen.getByRole('button', { name: 'Log in' }));

    waitFor(() => {
      const errors = screen.getAllByText('Invalid email or password');
      expect(errors).toHaveLength(2);
    });
  });
});
