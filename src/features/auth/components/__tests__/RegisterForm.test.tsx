import { userConstraints } from '@/lib/constants';
import '@/mocks/services/firebaseMock';
import { userWithoutReviewMock as userMock } from '@/mocks';
import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { RegisterForm } from '../RegisterForm';

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

  it('should show error message on blur if first name is too short', async () => {
    const user = userEvent.setup();
    await user.type(
      screen.getByLabelText('First Name'),
      't'.repeat(userConstraints.firstName.min - 1)
    );
    await user.tab();

    expect(
      screen.getByText(`Minimum first name length is ${userConstraints.firstName.min}`)
    ).toBeInTheDocument();
  });

  it('should not show error message on blur if first name length is correct', async () => {
    const user = userEvent.setup();
    await user.type(screen.getByLabelText('First Name'), 't'.repeat(userConstraints.firstName.min));
    await user.tab();

    expect(
      screen.queryByText(`Minimum first name length is ${userConstraints.firstName.min}`)
    ).not.toBeInTheDocument();
  });

  it('should show error message on blur if last name is too short', async () => {
    const user = userEvent.setup();
    await user.type(
      screen.getByLabelText('Last Name'),
      't'.repeat(userConstraints.lastName.min - 1)
    );
    await user.tab();

    expect(
      screen.getByText(`Minimum last name length is ${userConstraints.lastName.min}`)
    ).toBeInTheDocument();
  });

  it('should not show error message on blur if last name length is correct', async () => {
    const user = userEvent.setup();
    await user.type(screen.getByLabelText('Last Name'), 't'.repeat(userConstraints.lastName.min));
    await user.tab();

    expect(
      screen.queryByText(`Minimum first name length is ${userConstraints.firstName.min}`)
    ).not.toBeInTheDocument();
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

  it('should not show error message on blur if password length is correct', async () => {
    const user = userEvent.setup();
    await user.type(screen.getByLabelText('Password'), 't'.repeat(userConstraints.password.min));
    await user.tab();

    expect(
      screen.queryByText(`Minimum password length is ${userConstraints.password.min}`)
    ).not.toBeInTheDocument();
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
    await user.type(screen.getByRole('textbox', { name: 'Email' }), userMock.email);
    await user.type(screen.getByRole('textbox', { name: 'First Name' }), userMock.firstName);
    await user.type(screen.getByRole('textbox', { name: 'Last Name' }), userMock.lastName);
    await user.type(screen.getByLabelText('Password'), userMock.password);
    await user.type(screen.getByLabelText('Repeat Password'), userMock.password);
    await user.click(screen.getByRole('button', { name: 'Register' }));

    expect(await screen.findByText('Email already taken')).toBeInTheDocument();
  });
});
