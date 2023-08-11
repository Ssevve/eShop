import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Footer } from '../Footer';

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

  it('should render <SocialLinks /> component', () => {
    renderWithProviders(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: /facebook page/i })).toBeInTheDocument();
  });
});
