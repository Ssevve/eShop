import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { UpdateAmountTrigger } from '../UpdateAmountTrigger';

describe('CartProductControls component', () => {
  it("should render if 'shouldRender' prop is true", () => {
    const onClickMock = vi.fn();
    renderWithProviders(
      <UpdateAmountTrigger disabled={false} onClick={onClickMock} shouldRender={true} />
    );
    expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument();
  });

  it("should not render if 'shouldRender' prop is false", () => {
    const onClickMock = vi.fn();
    renderWithProviders(
      <UpdateAmountTrigger disabled={false} onClick={onClickMock} shouldRender={false} />
    );
    expect(screen.queryByRole('button', { name: /update/i })).not.toBeInTheDocument();
  });

  it("should not be disabled if 'disabled' prop is false", () => {
    const onClickMock = vi.fn();
    renderWithProviders(
      <UpdateAmountTrigger disabled={false} onClick={onClickMock} shouldRender={true} />
    );
    expect(screen.getByRole('button', { name: /update/i })).not.toBeDisabled();
  });

  it("should not be disabled if 'disabled' props is true", () => {
    const onClickMock = vi.fn();
    renderWithProviders(
      <UpdateAmountTrigger disabled={true} onClick={onClickMock} shouldRender={true} />
    );
    expect(screen.getByRole('button', { name: /update/i })).toBeDisabled();
  });

  it("should call 'onClick' prop when clicked", async () => {
    const onClickMock = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(
      <UpdateAmountTrigger disabled={false} onClick={onClickMock} shouldRender={true} />
    );
    await user.click(screen.getByRole('button', { name: /update/i }));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
