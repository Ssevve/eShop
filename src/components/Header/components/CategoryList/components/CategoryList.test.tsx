import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import renderWithProviders from 'utils/renderWithProviders';
import categories from 'lib/categories';
import CategoryList from '..';
import { BrowserRouter } from 'react-router-dom';

describe('CategoryList component', () => {
  it('should render CategoryListHeader component if isMobile is true', () => {
    const closeCategoriesMock = vi.fn();
    renderWithProviders(
      <BrowserRouter>
        <CategoryList
          shouldShowCategories={true}
          isMobile={true}
          closeCategories={closeCategoriesMock}
        />
      </BrowserRouter>
    );
    expect(screen.getByRole('heading', { name: /categories/i })).toBeInTheDocument();
  });

  it('should not render CategoryListHeader component if isMobile is false', () => {
    const closeCategoriesMock = vi.fn();
    renderWithProviders(
      <BrowserRouter>
        <CategoryList
          shouldShowCategories={true}
          isMobile={false}
          closeCategories={closeCategoriesMock}
        />
      </BrowserRouter>
    );
    expect(screen.queryByRole('heading', { name: /categories/i })).not.toBeInTheDocument();
  });

  it("should render 'all products' link", () => {
    const closeCategoriesMock = vi.fn();
    renderWithProviders(
      <BrowserRouter>
        <CategoryList
          shouldShowCategories={true}
          isMobile={true}
          closeCategories={closeCategoriesMock}
        />
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: /all products/i })).toBeInTheDocument();
  });

  it('should render links to all categories', () => {
    const closeCategoriesMock = vi.fn();
    // include 'all products' link in the final count
    const categoryCount = categories.length + 1;
    renderWithProviders(
      <BrowserRouter>
        <CategoryList
          shouldShowCategories={true}
          isMobile={true}
          closeCategories={closeCategoriesMock}
        />
      </BrowserRouter>
    );
    expect(screen.queryAllByRole('link')).toHaveLength(categoryCount);
  });
});
