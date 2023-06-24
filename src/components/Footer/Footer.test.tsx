import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import renderWithProviders from 'utils/renderWithProviders';
import Footer from '.';

describe('Footer component', () => {
  it('should render logo', () => {
    renderWithProviders(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    expect(screen.getByTitle(/eshop/i)).toBeInTheDocument();
  });

  it('should render copy paragraph', () => {
    renderWithProviders(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    expect(screen.getByText('© 2023 eShop. All Rights Reserved.')).toBeInTheDocument();
  });

  it('should render facebook page link', () => {
    renderWithProviders(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: /facebook page/i })).toBeInTheDocument();
  });

  it('should render instagram page link', () => {
    renderWithProviders(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: /instagram page/i })).toBeInTheDocument();
  });

  it('should render twitter page link', () => {
    renderWithProviders(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: /twitter page/i })).toBeInTheDocument();
  });
});
