import { userConstraints } from '@/lib/constants';
import { userWithoutReviewMock as mockUser } from '@/mocks/userMock';
import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'mocks/firebaseMock';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from '.';

describe('LoginForm component', () => {
  beforeEach(() => {
    renderWithProviders(
      <BrowserRouter>
        <LoginForm />
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
    await user.type(
      screen.getByLabelText('Password'),
      't'.repeat(userConstraints.password.min - 1)
    );
    await user.tab();

    expect(
      screen.getByText(`Minimum password length is ${userConstraints.password.min}`)
    ).toBeInTheDocument();
  });

  it('should not show error message on blur if password is length is correct', async () => {
    const user = userEvent.setup();
    await user.type(screen.getByLabelText('Password'), 't'.repeat(userConstraints.password.min));
    await user.tab();

    expect(
      screen.queryByText(`Minimum password length is ${userConstraints.password.min}`)
    ).not.toBeInTheDocument();
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
