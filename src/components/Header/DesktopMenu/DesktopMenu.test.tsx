import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import renderWithProviders from 'utils/renderWithProviders';
import { vi } from 'vitest';
import DesktopMenu from '.';

describe('DesktopMenu component', () => {
  it('should render home link', () => {
    const toggleCategoriesMock = vi.fn();
    renderWithProviders(
      <BrowserRouter>
        <DesktopMenu shouldShowCategories={false} toggleCategories={toggleCategoriesMock} />
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
  });

  it('should render products link', () => {
    const toggleCategoriesMock = vi.fn();
    renderWithProviders(
      <BrowserRouter>
        <DesktopMenu shouldShowCategories={false} toggleCategories={toggleCategoriesMock} />
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: /products/i })).toBeInTheDocument();
  });

  it('should not render CategoryList component if shouldShowCategories is false', () => {
    const toggleCategoriesMock = vi.fn();
    renderWithProviders(
      <BrowserRouter>
        <DesktopMenu shouldShowCategories={false} toggleCategories={toggleCategoriesMock} />
      </BrowserRouter>
    );
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('should render CategoryList component if shouldShowCategories is true', () => {
    const toggleCategoriesMock = vi.fn();
    renderWithProviders(
      <BrowserRouter>
        <DesktopMenu shouldShowCategories={true} toggleCategories={toggleCategoriesMock} />
      </BrowserRouter>
    );
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
