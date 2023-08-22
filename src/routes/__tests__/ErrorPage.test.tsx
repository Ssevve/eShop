import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorPage } from '../ErrorPage';

describe('ErrorPage', () => {
  it('should render error image', () => {
    renderWithProviders(
      <BrowserRouter>
        <ErrorPage />
      </BrowserRouter>
    );
    expect(screen.getByRole('img', { name: /error/i })).toBeInTheDocument();
  });

  it('should render correct heading', () => {
    renderWithProviders(
      <BrowserRouter>
        <ErrorPage />
      </BrowserRouter>
    );
    expect(screen.getByRole('heading', { name: 'Error!' })).toBeInTheDocument();
  });

  it('should render correct paragraph', () => {
    renderWithProviders(
      <BrowserRouter>
        <ErrorPage />
      </BrowserRouter>
    );
    expect(screen.getByText('Something went wrong. Please try again.')).toBeInTheDocument();
  });

  it('should render shop link', () => {
    renderWithProviders(
      <BrowserRouter>
        <ErrorPage />
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: /go to shop/i })).toBeInTheDocument();
  });

  it('should render home link', () => {
    renderWithProviders(
      <BrowserRouter>
        <ErrorPage />
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: /go to home page/i })).toBeInTheDocument();
  });
});
