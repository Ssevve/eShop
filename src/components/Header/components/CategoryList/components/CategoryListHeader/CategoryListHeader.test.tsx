import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import renderWithProviders from 'utils/renderWithProviders';
import CategoryListHeader from '.';

describe('CategoryListHeader component', () => {
  it('should render heading', () => {
    const closeCategoriesMock = vi.fn();
    renderWithProviders(<CategoryListHeader closeCategories={closeCategoriesMock} />);
    expect(screen.getByRole('heading', { name: /categories/i })).toBeInTheDocument();
  });

  it("should call closeCategories on 'close categories' button click", async () => {
    const closeCategoriesMock = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(<CategoryListHeader closeCategories={closeCategoriesMock} />);
    await user.click(screen.getByRole('button', { name: /close categories/i }));
    expect(closeCategoriesMock).toHaveBeenCalledTimes(1);
  });
});
