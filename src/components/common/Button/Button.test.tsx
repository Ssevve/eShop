// @vitest-environment jsdom

import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import renderWithProviders from 'utils/renderWithProviders';
import Button from '.';
import userEvent from '@testing-library/user-event';

describe('Button component', () => {
  it('should render a button with correct text size class if textSize prop is provided', () => {
    const onClickHandler = vi.fn();
    renderWithProviders(
      <Button textSize="xl" onClick={onClickHandler}>
        text
      </Button>
    );
    expect(screen.getByRole('button')).toHaveClass('text-xl');
  });

  it('should render a button with base text size if textSize prop is not provided', () => {
    const onClickHandler = vi.fn();
    renderWithProviders(<Button onClick={onClickHandler}>text</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-base');
  });

  it('should call onClick function when clicked', async () => {
    const onClickHandler = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(<Button onClick={onClickHandler}>text</Button>);
    await user.click(screen.getByRole('button'));

    expect(onClickHandler).toHaveBeenCalledTimes(1);
  });
});
