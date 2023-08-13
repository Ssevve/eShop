import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { CloseMenuButton } from '../CloseMenuButton';

describe('CloseMenuButton component', () => {
  it("should call 'close' prop on click", async () => {
    const closeMock = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(<CloseMenuButton close={closeMock} />);

    await user.click(screen.getByRole('button', { name: /close/i }));

    expect(closeMock).toHaveBeenCalledTimes(1);
  });
});
