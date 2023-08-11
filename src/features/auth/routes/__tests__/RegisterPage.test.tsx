import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RegisterPage } from '../RegisterPage';

describe('RegisterPage', () => {
  it('should render <RegisterForm /> component', () => {
    renderWithProviders(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );
    expect(screen.getByRole('form', { name: /register/i })).toBeInTheDocument();
  });
});
