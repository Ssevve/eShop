import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Modal } from '../Modal';

describe('Modal component', () => {
  it('should render title if provided', () => {
    const expectedTitle = 'Test title';
    const closeMock = vi.fn();
    renderWithProviders(
      <Modal close={closeMock} title={expectedTitle}>
        <p>Children</p>
      </Modal>
    );
    expect(screen.getByText(expectedTitle)).toBeInTheDocument();
  });

  it('should render <CloseMenuButton /> component', () => {
    const closeMock = vi.fn();
    renderWithProviders(
      <Modal close={closeMock}>
        <p>Children</p>
      </Modal>
    );
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  it("should call 'close' on <CloseMenuButton /> click", async () => {
    const closeMock = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(
      <Modal close={closeMock}>
        <p>Children</p>
      </Modal>
    );

    await user.click(screen.getByRole('button', { name: /close/i }));

    expect(closeMock).toHaveBeenCalledTimes(1);
  });

  it('should render children', () => {
    const expectedChildrenText = 'Children';
    const closeMock = vi.fn();
    renderWithProviders(
      <Modal close={closeMock}>
        <p>{expectedChildrenText}</p>
      </Modal>
    );
    expect(screen.getByText(expectedChildrenText)).toBeInTheDocument();
  });
});
