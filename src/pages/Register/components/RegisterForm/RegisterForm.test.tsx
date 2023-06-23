// @vitest-environment jsdom

import 'mocks/firebase';
import { BrowserRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithProviders from 'utils/renderWithProviders';
import { MIN_PASSWORD_LENGTH } from 'lib/constants';
import mockUser from 'mocks/user';
import RegisterForm from '.';

describe('RegisterForm component', () => {
  beforeEach(() => {
    renderWithProviders(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>
    );
  });

  it('should show error message on blur if email format is not valid', async () => {
    const user = userEvent.setup();
    await user.type(screen.getByRole('textbox', { name: 'Email' }), 'badformat');
    await user.tab();

    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('should not show error message on blur if email format is valid', async () => {
    const user = userEvent.setup();
    await user.type(screen.getByRole('textbox', { name: 'Email' }), 'correct@format.com');
    await user.tab();

    expect(screen.queryByText('Invalid email')).not.toBeInTheDocument();
  });

  it('should show error message on blur if password is too short', async () => {
    const user = userEvent.setup();
    await user.type(screen.getByLabelText('Password'), 'short');
    await user.tab();

    expect(
      screen.getByText(`Minimum password length is ${MIN_PASSWORD_LENGTH}`)
    ).toBeInTheDocument();
  });

  it('should show error message on blur if passwords do not match', async () => {
    const user = userEvent.setup();
    await user.type(screen.getByLabelText('Password'), 'password');
    await user.type(screen.getByLabelText('Repeat Password'), 'password2');
    await user.tab();

    expect(screen.getByText("Passwords don't match")).toBeInTheDocument();
  });

  it('should show error message if email is already taken', async () => {
    const user = userEvent.setup();
    await user.type(screen.getByRole('textbox', { name: 'Email' }), mockUser.email);
    await user.type(screen.getByLabelText('Password'), mockUser.password);
    await user.type(screen.getByLabelText('Repeat Password'), mockUser.password);
    await user.click(screen.getByRole('button', { name: 'Register' }));

    expect(await screen.findByText('Email already taken')).toBeInTheDocument();
  });
});
