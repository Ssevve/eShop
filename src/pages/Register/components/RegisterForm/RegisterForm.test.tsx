import { BrowserRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import renderWithProviders from 'test/renderWithProviders';
import RegisterForm from '.';

describe('Register form', () => {
  test('Renders a form', () => {
    renderWithProviders(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>
    );
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  test('Renders logo', () => {
    renderWithProviders(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>
    );
    expect(screen.getByRole('note', { name: /eshop/i })).toBeInTheDocument();
  });

  test('Renders an email input', () => {
    renderWithProviders(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>
    );
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
  });

  test('Renders a password input', () => {
    renderWithProviders(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>
    );
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
  });

  test('Renders a repeat password input', () => {
    renderWithProviders(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>
    );
    expect(screen.getByLabelText(/repeat password/i)).toBeInTheDocument();
  });

  test('Renders a register button', () => {
    renderWithProviders(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>
    );
    expect(
      screen.getByRole('button', { name: /register/i })
    ).toBeInTheDocument();
  });

  test('Renders a footer text', () => {
    renderWithProviders(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>
    );
    expect(screen.getByText(/have an account?/i)).toBeInTheDocument();
  });

  test('Renders a log in page link', () => {
    renderWithProviders(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: /log in/i })).toBeInTheDocument();
  });
});
