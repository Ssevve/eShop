import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LoginPage } from '../LoginPage';

describe('LoginPage', () => {
  it('should render <LoginForm /> component', () => {
    renderWithProviders(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    expect(screen.getByRole('form', { name: /log in/i })).toBeInTheDocument();
  });
});
