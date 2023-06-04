// @vitest-environment jsdom

import 'mocks/firebase';
import { BrowserRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithProviders from 'utils/renderWithProviders';
import LoginForm from '.';

const badEmailFormat = 'bademail';
const tooShortPassword = 'pass';
const correctPassword = 'correctPassword';
const correctEmail = 'correct@email.com';
const notFoundEmail = 'notfound@email.com';
const wrongPassword = 'wrongPassword';

describe('LoginForm component', () => {
  beforeEach(() => {
    renderWithProviders(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
  });

  it('should show error message if email format is not valid', async () => {
    const userCredentials = {
      email: badEmailFormat,
      password: correctPassword,
    };
    const user = userEvent.setup();
    await user.type(screen.getByRole('textbox', { name: 'Email' }), userCredentials.email);
    await user.type(screen.getByLabelText('Password'), userCredentials.password);
    await user.click(screen.getByRole('button', { name: 'Log in' }));

    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('should show error message when password is too short', async () => {
    const userCredentials = {
      email: correctEmail,
      password: tooShortPassword,
    };
    const user = userEvent.setup();
    await user.type(screen.getByRole('textbox', { name: 'Email' }), userCredentials.email);
    await user.type(screen.getByLabelText('Password'), userCredentials.password);
    await user.click(screen.getByRole('button', { name: 'Log in' }));

    expect(screen.getByText('Minimum password length is 6')).toBeInTheDocument();
  });

  it('should show error messages when user was not found', async () => {
    const userCredentials = {
      email: notFoundEmail,
      password: correctPassword,
    };

    const user = userEvent.setup();
    await user.type(screen.getByRole('textbox', { name: 'Email' }), userCredentials.email);
    await user.type(screen.getByLabelText('Password'), userCredentials.password);
    await user.click(screen.getByRole('button', { name: 'Log in' }));

    const errors = await screen.findAllByText('Invalid email or password');
    expect(errors).toHaveLength(2);
  });

  it('should show error messages when password was wrong', async () => {
    const userCredentials = {
      email: correctEmail,
      password: wrongPassword,
    };
    const user = userEvent.setup();
    await user.type(screen.getByRole('textbox', { name: 'Email' }), userCredentials.email);
    await user.type(screen.getByLabelText('Password'), userCredentials.password);
    await user.click(screen.getByRole('button', { name: 'Log in' }));

    const errors = await screen.findAllByText('Invalid email or password');
    expect(errors).toHaveLength(2);
  });

  //   it('should navigate to account page if user was successfully logged in', async () => {
  //     const userCredentials = {
  //       email: correctEmail,
  //       password: correctPassword,
  //     };
  //     const user = userEvent.setup();
  //     await user.type(screen.getByRole('textbox', { name: 'Email' }), userCredentials.email);
  //     await user.type(screen.getByLabelText('Password'), userCredentials.password);
  //     await user.click(screen.getByRole('button', { name: 'Log in' }));

  //     await waitFor(() => {
  //       expect(screen.getByRole('button', { name: 'Log out' })).toBeInTheDocument();
  //     });
  //   });
});
