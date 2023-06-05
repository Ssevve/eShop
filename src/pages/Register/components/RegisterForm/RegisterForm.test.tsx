// @vitest-environment jsdom

import 'mocks/firebase';
import { BrowserRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithProviders from 'utils/renderWithProviders';
import RegisterForm from '.';
import mockUser from 'mocks/user';

describe('RegisterForm component', () => {
  beforeEach(() => {
    renderWithProviders(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>
    );
  });

  it('should show error message if email format is not valid', async () => {
    const user = userEvent.setup();
    await user.type(screen.getByRole('textbox', { name: 'Email' }), 'badformat');

    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('should not show error message if email format is valid', async () => {
    const user = userEvent.setup();
    await user.type(screen.getByRole('textbox', { name: 'Email' }), 'correct@format.com');

    expect(screen.queryByText('Invalid email')).not.toBeInTheDocument();
  });

  it('should show error message if password is too short', async () => {
    const user = userEvent.setup();
    await user.type(screen.getByLabelText('Password'), 'short');

    expect(screen.getByText('Minimum password length is 6')).toBeInTheDocument();
  });

  it('should show error message if passwords do not match', async () => {
    const user = userEvent.setup();
    await user.type(screen.getByLabelText('Password'), 'password');
    await user.type(screen.getByLabelText('Repeat Password'), 'password2');

    expect(screen.getByText("Passwords don't match")).toBeInTheDocument();
  });

  it('should show error messages if email is already taken', async () => {
    const user = userEvent.setup();
    await user.type(screen.getByRole('textbox', { name: 'Email' }), mockUser.email);
    await user.type(screen.getByLabelText('Password'), mockUser.password);
    await user.type(screen.getByLabelText('Repeat Password'), mockUser.password);
    await user.click(screen.getByRole('button', { name: 'Register' }));

    expect(await screen.findByText('Email already taken')).toBeInTheDocument();
  });
});
