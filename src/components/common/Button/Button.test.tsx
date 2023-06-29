import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import renderWithProviders from 'utils/renderWithProviders';
import { BrowserRouter, Link } from 'react-router-dom';
import Button from '.';
import userEvent from '@testing-library/user-event';

describe('Button component', () => {
  it('should render with correct text size if textSize prop is provided', () => {
    const onClickHandler = vi.fn();
    renderWithProviders(
      <Button textSize="xl" onClick={onClickHandler}>
        text
      </Button>
    );
    expect(screen.getByRole('button')).toHaveClass('text-xl');
  });

  it('should render with base text size if textSize prop is not provided', () => {
    const onClickHandler = vi.fn();
    renderWithProviders(<Button onClick={onClickHandler}>text</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-base');
  });

  it('should render with even padding if evenPadding prop is provided', () => {
    const onClickHandler = vi.fn();
    renderWithProviders(
      <Button evenPadding onClick={onClickHandler}>
        text
      </Button>
    );
    expect(screen.getByRole('button')).toHaveClass('p-3');
  });

  it('should render with default padding if evenPadding prop is not provided', () => {
    const onClickHandler = vi.fn();
    renderWithProviders(<Button onClick={onClickHandler}>text</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-6');
    expect(screen.getByRole('button')).toHaveClass('py-3');
  });

  it('should render a correct variant if specified', () => {
    const onClickHandler = vi.fn();
    renderWithProviders(
      <Button variant="neutral" onClick={onClickHandler}>
        text
      </Button>
    );
    expect(screen.getByRole('button')).toHaveClass('bg-gray-200');
  });

  it('should render a primary variant by default', () => {
    const onClickHandler = vi.fn();
    renderWithProviders(<Button onClick={onClickHandler}>text</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-primary');
  });

  it('should take up full width if fullWidth prop is provided', () => {
    const onClickHandler = vi.fn();
    renderWithProviders(
      <Button fullWidth onClick={onClickHandler}>
        text
      </Button>
    );
    expect(screen.getByRole('button')).toHaveClass('w-full');
  });

  it('should not take up full width if fullWidth prop is not provided', () => {
    const onClickHandler = vi.fn();
    renderWithProviders(<Button onClick={onClickHandler}>text</Button>);
    const button = screen.getByRole('button');
    expect(button).not.toHaveClass('w-full');
    expect(button).toHaveClass('w-max');
  });

  it("should render as button if 'as' prop is not provided", () => {
    renderWithProviders(<Button>text</Button>);
    expect(screen.getByRole('button', { name: 'text' })).toBeInTheDocument();
  });

  it("should render as link if 'as' prop is provided with 'Link' value", () => {
    renderWithProviders(
      <BrowserRouter>
        <Button as={Link} to="/test">
          text
        </Button>
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: 'text' })).toBeInTheDocument();
  });

  it('should call onClick function when clicked', async () => {
    const onClickHandler = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(<Button onClick={onClickHandler}>text</Button>);
    await user.click(screen.getByRole('button'));

    expect(onClickHandler).toHaveBeenCalledTimes(1);
  });
});
