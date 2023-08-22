import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NotFoundPage } from '../NotFoundPage';

describe('NotFoundPage', () => {
  it('should render 404 image', () => {
    renderWithProviders(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );
    expect(screen.getByRole('img', { name: /page not found/i })).toBeInTheDocument();
  });

  it('should render correct paragraph', () => {
    renderWithProviders(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );
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
