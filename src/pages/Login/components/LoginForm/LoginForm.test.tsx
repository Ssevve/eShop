import 'mocks/firebase';
import { BrowserRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithProviders from 'utils/renderWithProviders';
import { passwordConstraints } from 'lib/constants';
import mockUser from 'mocks/user';
import LoginForm from '.';

describe('LoginForm component', () => {
  beforeEach(() => {
    renderWithProviders(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
  });

  it('should show error message if email format is not valid', async () => {
    const user = userEvent.setup();
    await user.type(screen.getByRole('textbox', { name: 'Email' }), 'badformat');
    await user.type(screen.getByLabelText('Password'), mockUser.password);
    await user.click(screen.getByRole('button', { name: 'Log in' }));

    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('should show error message if password is too short', async () => {
    const user = userEvent.setup();
    await user.type(screen.getByRole('textbox', { name: 'Email' }), mockUser.email);
    await user.type(screen.getByLabelText('Password'), 'short');
    await user.click(screen.getByRole('button', { name: 'Log in' }));

    expect(
      screen.getByText(`Minimum password length is ${passwordConstraints.min}`)
    ).toBeInTheDocument();
  });

  it('should show error messages if user is not found', async () => {
    const user = userEvent.setup();
    await user.type(screen.getByRole('textbox', { name: 'Email' }), 'notfound@email.com');
    await user.type(screen.getByLabelText('Password'), mockUser.password);
    await user.click(screen.getByRole('button', { name: 'Log in' }));

    const errors = await screen.findAllByText('Invalid email or password');
    expect(errors).toHaveLength(2);
  });

  it('should show error messages if password is wrong', async () => {
    const user = userEvent.setup();
    await user.type(screen.getByRole('textbox', { name: 'Email' }), mockUser.email);
    await user.type(screen.getByLabelText('Password'), 'wrongPassword');
    await user.click(screen.getByRole('button', { name: 'Log in' }));

    const errors = await screen.findAllByText('Invalid email or password');
    expect(errors).toHaveLength(2);
  });
});
