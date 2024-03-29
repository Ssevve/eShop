import { categories } from '@/features/categories/categories';
import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { CategoryList } from '../CategoryList';

describe('CategoryList component', () => {
  it("should render 'all products' link", () => {
    const toggleCloseMock = vi.fn();
    renderWithProviders(
      <BrowserRouter>
        <CategoryList toggleClose={toggleCloseMock} />
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: /all products/i })).toBeInTheDocument();
  });

  it('should render links to all categories', () => {
    const toggleCloseMock = vi.fn();
    renderWithProviders(
      <BrowserRouter>
        <CategoryList toggleClose={toggleCloseMock} />
      </BrowserRouter>
    );

    const areAllCategoriesRendered = categories.every((category) =>
      screen.getByRole('link', { name: category })
    );
    expect(areAllCategoriesRendered).toBeTruthy();
  });
});
