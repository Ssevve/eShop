import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { MobileMenu } from '../MobileMenu';

describe('MobileMenu component', () => {
  it('should not render if isOpen is false', () => {
    const toggleCloseMock = vi.fn();
    renderWithProviders(
      <BrowserRouter>
        <MobileMenu toggleClose={toggleCloseMock} isOpen={false} />
      </BrowserRouter>
    );
    expect(screen.queryByRole('heading', { level: 2, name: /menu/i })).not.toBeInTheDocument();
  });

  it('should render if isOpen is true', () => {
    const toggleCloseMock = vi.fn();
    renderWithProviders(
      <BrowserRouter>
        <MobileMenu toggleClose={toggleCloseMock} isOpen={true} />
      </BrowserRouter>
    );
    expect(screen.getByRole('heading', { level: 2, name: /menu/i })).toBeInTheDocument();
  });

  describe('when opened', () => {
    it('should render close button', () => {
      const toggleCloseMock = vi.fn();
      renderWithProviders(
        <BrowserRouter>
          <MobileMenu toggleClose={toggleCloseMock} isOpen={true} />
        </BrowserRouter>
      );
      expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument();
    });

    it('should render home link', () => {
      const toggleCloseMock = vi.fn();
      renderWithProviders(
        <BrowserRouter>
          <MobileMenu toggleClose={toggleCloseMock} isOpen={true} />
        </BrowserRouter>
      );
      expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    });

    it('should render products button', () => {
      const toggleCloseMock = vi.fn();
      renderWithProviders(
        <BrowserRouter>
          <MobileMenu toggleClose={toggleCloseMock} isOpen={true} />
        </BrowserRouter>
      );
      expect(screen.getByRole('button', { name: /products/i })).toBeInTheDocument();
    });

    it("should render 'contact us' section", () => {
      const toggleCloseMock = vi.fn();
      renderWithProviders(
        <BrowserRouter>
          <MobileMenu toggleClose={toggleCloseMock} isOpen={true} />
        </BrowserRouter>
      );
      expect(screen.getByRole('heading', { level: 3, name: /contact us/i })).toBeInTheDocument();
    });

    it("should render 'contact us' section", () => {
      const toggleCloseMock = vi.fn();
      renderWithProviders(
        <BrowserRouter>
          <MobileMenu toggleClose={toggleCloseMock} isOpen={true} />
        </BrowserRouter>
      );
      expect(screen.getByRole('heading', { level: 3, name: /contact us/i })).toBeInTheDocument();
    });

    it('should render an email', () => {
      const toggleCloseMock = vi.fn();
      renderWithProviders(
        <BrowserRouter>
          <MobileMenu toggleClose={toggleCloseMock} isOpen={true} />
        </BrowserRouter>
      );
      expect(screen.getByText(/eshop@eshop.com/i)).toBeInTheDocument();
    });

    it('should render a phone number', () => {
      const toggleCloseMock = vi.fn();
      renderWithProviders(
        <BrowserRouter>
          <MobileMenu toggleClose={toggleCloseMock} isOpen={true} />
        </BrowserRouter>
      );
      expect(screen.getByText('44 555 66 77')).toBeInTheDocument();
    });

    it('should render working hours', () => {
      const toggleCloseMock = vi.fn();
      renderWithProviders(
        <BrowserRouter>
          <MobileMenu toggleClose={toggleCloseMock} isOpen={true} />
        </BrowserRouter>
      );
      expect(screen.getByText('8 a.m - 9 p.m.')).toBeInTheDocument();
    });

    it('should SocialLinks component', () => {
      const toggleCloseMock = vi.fn();
      renderWithProviders(
        <BrowserRouter>
          <MobileMenu toggleClose={toggleCloseMock} isOpen={true} />
        </BrowserRouter>
      );
      expect(screen.getByRole('link', { name: 'Facebook page' })).toBeInTheDocument();
    });
  });
});
