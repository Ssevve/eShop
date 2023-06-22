// @vitest-environment jsdom

import { vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MAX_PRODUCT_QUANTITY, MIN_PRODUCT_QUANTITY } from 'lib/constants';
import renderWithProviders from 'utils/renderWithProviders';
import QuantityInput from '.';

describe('QuantityInput component', () => {
  describe('when input element is rendered', () => {
    const setCountMock = vi.fn();
    renderWithProviders(<QuantityInput count={4} setCount={setCountMock} />);
    it('should have correct initial value', () => {
      expect(screen.getByRole('spinbutton')).toHaveValue(4);
    });
  });

  describe('when decrement button is clicked', () => {
    it('should be disabled if count equals minCount', () => {
      const setCountMock = vi.fn();
      renderWithProviders(<QuantityInput count={2} minCount={2} setCount={setCountMock} />);
      expect(screen.getByLabelText('Decrease quantity')).toBeDisabled();
    });

    it('should decrement if count is greater than minCount', async () => {
      const setCountMock = vi.fn();
      const user = userEvent.setup();
      renderWithProviders(<QuantityInput count={3} minCount={2} setCount={setCountMock} />);
      await user.click(screen.getByLabelText('Decrease quantity'));
      expect(setCountMock).toHaveBeenCalledTimes(1);
      expect(setCountMock).toHaveBeenCalledWith(2);
    });

    it('should not decrement if count equals minCount', async () => {
      const setCountMock = vi.fn();
      const user = userEvent.setup();
      renderWithProviders(<QuantityInput count={2} minCount={2} setCount={setCountMock} />);
      await user.click(screen.getByLabelText('Decrease quantity'));
      expect(setCountMock).not.toHaveBeenCalled();
    });
  });

  describe('when increment button is clicked', () => {
    it('should increment if count is less than maxCount', async () => {
      const setCountMock = vi.fn();
      const user = userEvent.setup();
      renderWithProviders(<QuantityInput count={3} maxCount={5} setCount={setCountMock} />);
      await user.click(screen.getByLabelText('Increase quantity'));
      expect(setCountMock).toHaveBeenCalledTimes(1);
      expect(setCountMock).toHaveBeenCalledWith(4);
    });

    it('should not increment if count equals maxCount', async () => {
      const setCountMock = vi.fn();
      const user = userEvent.setup();
      renderWithProviders(<QuantityInput count={2} maxCount={2} setCount={setCountMock} />);
      await user.click(screen.getByLabelText('Increase quantity'));
      expect(setCountMock).not.toHaveBeenCalled();
    });
  });

  describe("when input's value change", () => {
    it('should set count to a given value if it is between minCount and maxCount', async () => {
      const setCountMock = vi.fn();
      renderWithProviders(
        <QuantityInput count={1} minCount={2} maxCount={5} setCount={setCountMock} />
      );
      fireEvent.change(screen.getByRole('spinbutton'), { target: { value: 4 } });
      expect(setCountMock).toHaveBeenCalledWith(4);
    });

    it('should set count to minCount if value is less than minCount', async () => {
      const setCountMock = vi.fn();
      renderWithProviders(<QuantityInput count={1} setCount={setCountMock} />);
      fireEvent.change(screen.getByRole('spinbutton'), {
        target: { value: MIN_PRODUCT_QUANTITY - 1 },
      });
      expect(setCountMock).toHaveBeenCalledWith(MIN_PRODUCT_QUANTITY);
    });

    it('should set count to maxCount if value is greater than maxCount', async () => {
      const setCountMock = vi.fn();
      renderWithProviders(<QuantityInput count={1} setCount={setCountMock} />);
      fireEvent.change(screen.getByRole('spinbutton'), {
        target: { value: MAX_PRODUCT_QUANTITY + 1 },
      });
      expect(setCountMock).toHaveBeenCalledWith(MAX_PRODUCT_QUANTITY);
    });
  });
});
