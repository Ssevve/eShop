import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { CategoryLink } from '../CategoryLink';

describe('CategoryLink component', () => {
  it('should render with correct label', () => {
    const onClickMock = vi.fn();
    renderWithProviders(
      <BrowserRouter>
        <CategoryLink onClick={onClickMock} label="test label" category="test-category" />
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: /test label/i })).toBeInTheDocument();
  });

  it('should render with correct href attribute', () => {
    const onClickMock = vi.fn();
    const expectedCategory = 'test-category';
    renderWithProviders(
      <BrowserRouter>
        <CategoryLink onClick={onClickMock} label="test label" category="test-category" />
      </BrowserRouter>
    );
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      `/products?category=${expectedCategory}`
    );
  });

  it("should call 'onClick' prop when clicked", async () => {
    const onClickMock = vi.fn();
    const expectedCategory = 'test-category';
    const user = userEvent.setup();
    renderWithProviders(
      <BrowserRouter>
        <CategoryLink onClick={onClickMock} label="test label" category="test-category" />
      </BrowserRouter>
    );

    await user.click(screen.getByRole('link', { name: /test label/i }));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
