import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NotFoundPage } from '../NotFoundPage';

describe('NotFoundPage', () => {
  it('should render correct heading', () => {
    renderWithProviders(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );
    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
  });

  it('should render correct paragraphs', () => {
    renderWithProviders(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );
    expect(screen.getByText('Page not found.')).toBeInTheDocument();
    expect(screen.getByText("Sorry, we can't find this page.")).toBeInTheDocument();
  });

  it('should render shop link', () => {
    renderWithProviders(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: /go to shop/i })).toBeInTheDocument();
  });

  it('should render home link', () => {
    renderWithProviders(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: /go to home page/i })).toBeInTheDocument();
  });
});
