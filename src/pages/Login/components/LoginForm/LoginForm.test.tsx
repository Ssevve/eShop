import { BrowserRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import renderWithProviders from 'utils/renderWithProviders';
import LoginForm from '.';

describe('Login form', () => {
  test('Renders a form', () => {
    renderWithProviders(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  test('Renders logo', () => {
    renderWithProviders(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
    expect(screen.getByRole('note', { name: /eshop/i })).toBeInTheDocument();
  });

  test('Renders an email input', () => {
    renderWithProviders(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
  });

  test('Renders a password input', () => {
    renderWithProviders(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('Renders a log in button', () => {
    renderWithProviders(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  test('Renders a footer text', () => {
    renderWithProviders(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
    expect(screen.getByText(/need an account?/i)).toBeInTheDocument();
  });

  test('Renders a register page link', () => {
    renderWithProviders(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument();
  });
});
