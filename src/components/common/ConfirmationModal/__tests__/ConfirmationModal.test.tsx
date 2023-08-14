import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { ConfirmationModal } from '../ConfirmationModal';

describe('ConfirmationModal component', () => {
  it("should render a button with 'confirmText'", () => {
    const expectedText = 'confirm text';
    const closeMock = vi.fn();
    const confirmCallbackMock = vi.fn();
    renderWithProviders(
      <ConfirmationModal
        close={closeMock}
        confirmText={expectedText}
        confirmCallback={confirmCallbackMock}
        message="Test message"
      />
    );
    expect(screen.getByRole('button', { name: expectedText })).toBeInTheDocument();
  });

  it("should call 'confirmationCallback' on confirm button click", async () => {
    const expectedText = 'confirm text';
    const closeMock = vi.fn();
    const confirmCallbackMock = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(
      <ConfirmationModal
        close={closeMock}
        confirmText={expectedText}
        confirmCallback={confirmCallbackMock}
        message="Test message"
      />
    );
    await user.click(screen.getByRole('button', { name: expectedText }));
    expect(confirmCallbackMock).toHaveBeenCalledTimes(1);
  });

  it('should close on confirm button click', async () => {
    const expectedText = 'confirm text';
    const closeMock = vi.fn();
    const confirmCallbackMock = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(
      <ConfirmationModal
        close={closeMock}
        confirmText={expectedText}
        confirmCallback={confirmCallbackMock}
        message="Test message"
      />
    );
    await user.click(screen.getByRole('button', { name: expectedText }));
    expect(closeMock).toHaveBeenCalledTimes(1);
  });

  it("should render 'message'", () => {
    const expectedMessage = 'Test message';
    const closeMock = vi.fn();
    const confirmCallbackMock = vi.fn();
    renderWithProviders(
      <ConfirmationModal
        close={closeMock}
        confirmText="confirm text"
        confirmCallback={confirmCallbackMock}
        message="Test message"
      />
    );
    expect(screen.getByText(expectedMessage)).toBeInTheDocument();
  });
});
