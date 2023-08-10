import { productConstraints } from '@/lib/constants';
import renderWithProviders from '@/utils/renderWithProviders';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { AmountInput } from '../AmountInput';
import { cartProductsMock } from '@/mocks';

describe('AmountInput component', () => {
  it('should have correct initial value', () => {
    const expectedProduct = cartProductsMock[0];
    const setAmountMock = vi.fn();
    renderWithProviders(
      <AmountInput
        initialAmount={expectedProduct.amount}
        minAmount={productConstraints.amount.min}
        maxAmount={productConstraints.amount.max}
        amount={expectedProduct.amount}
        setAmount={setAmountMock}
      />
    );
    expect(screen.getByRole('spinbutton')).toHaveValue(expectedProduct.amount);
  });

  describe('decrement button', () => {
    it('should be disabled if amount equals minAmount', () => {
      const setAmountMock = vi.fn();
      renderWithProviders(
        <AmountInput
          amount={productConstraints.amount.min}
          minAmount={productConstraints.amount.min}
          maxAmount={productConstraints.amount.max}
          setAmount={setAmountMock}
          initialAmount={productConstraints.amount.min}
        />
      );
      expect(screen.getByLabelText(/decrease amount/i)).toBeDisabled();
    });

    it('should not decrement if amount equals minAmount', async () => {
      const setAmountMock = vi.fn();
      const user = userEvent.setup();
      renderWithProviders(
        <AmountInput
          amount={productConstraints.amount.min}
          minAmount={productConstraints.amount.min}
          maxAmount={productConstraints.amount.max}
          setAmount={setAmountMock}
          initialAmount={productConstraints.amount.min}
        />
      );
      await user.click(screen.getByLabelText(/decrease amount/i));
      expect(screen.getByRole('spinbutton')).toHaveValue(productConstraints.amount.min);
    });
  });

  it('should decrement if amount is greater than minAmount', async () => {
    const setAmountMock = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(
      <AmountInput
        amount={productConstraints.amount.max}
        minAmount={productConstraints.amount.min}
        maxAmount={productConstraints.amount.max}
        setAmount={setAmountMock}
        initialAmount={productConstraints.amount.max}
      />
    );
    await user.click(screen.getByLabelText(/decrease amount/i));
    expect(screen.getByRole('spinbutton')).toHaveValue(productConstraints.amount.max - 1);
  });

  describe('increment button', () => {
    it('should be disabled if amount equals maxAmount', () => {
      const setAmountMock = vi.fn();
      renderWithProviders(
        <AmountInput
          amount={productConstraints.amount.max}
          minAmount={productConstraints.amount.min}
          maxAmount={productConstraints.amount.max}
          setAmount={setAmountMock}
          initialAmount={productConstraints.amount.max}
        />
      );
      expect(screen.getByLabelText(/increase amount/i)).toBeDisabled();
    });

    it('should not increment if amount equals maxAmount', async () => {
      const setAmountMock = vi.fn();
      const user = userEvent.setup();
      renderWithProviders(
        <AmountInput
          amount={productConstraints.amount.max}
          minAmount={productConstraints.amount.min}
          maxAmount={productConstraints.amount.max}
          setAmount={setAmountMock}
          initialAmount={productConstraints.amount.max}
        />
      );
      await user.click(screen.getByLabelText(/decrease amount/i));
      expect(screen.getByRole('spinbutton')).toHaveValue(productConstraints.amount.max - 1);
    });
  });

  it('should increment if amount is less than maxAmount', async () => {
    const expectedProduct = cartProductsMock[0];
    const setAmountMock = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(
      <AmountInput
        amount={productConstraints.amount.min}
        minAmount={productConstraints.amount.min}
        maxAmount={productConstraints.amount.max}
        setAmount={setAmountMock}
        initialAmount={productConstraints.amount.min}
      />
    );
    await user.click(screen.getByLabelText(/increase amount/i));
    expect(setAmountMock).toHaveBeenCalledTimes(1);
    expect(setAmountMock).toHaveBeenCalledWith(productConstraints.amount.min + 1);
  });

  describe('number input', () => {
    it('should allow user to change value', async () => {
      const setAmountMock = vi.fn();
      renderWithProviders(
        <AmountInput
          amount={productConstraints.amount.min}
          minAmount={productConstraints.amount.min}
          maxAmount={productConstraints.amount.max}
          setAmount={setAmountMock}
          initialAmount={productConstraints.amount.min}
        />
      );

      const numberInput = screen.getByRole('spinbutton');
      fireEvent.change(numberInput, { target: { value: 4 } });
      expect(numberInput).toHaveValue(4);
    });

    it('should set value to maxAmount if input is greater than maxAmount', async () => {
      const setAmountMock = vi.fn();
      renderWithProviders(
        <AmountInput
          amount={productConstraints.amount.min}
          minAmount={productConstraints.amount.min}
          maxAmount={productConstraints.amount.max}
          setAmount={setAmountMock}
          initialAmount={productConstraints.amount.min}
        />
      );

      const numberInput = screen.getByRole('spinbutton');
      fireEvent.change(numberInput, { target: { value: productConstraints.amount.max + 1 } });
      expect(numberInput).toHaveValue(productConstraints.amount.max);
    });

    it('should set value to minAmount if input is less than minAmount', async () => {
      const expectedProduct = cartProductsMock[0];
      const setAmountMock = vi.fn();
      renderWithProviders(
        <AmountInput
          amount={productConstraints.amount.min}
          minAmount={productConstraints.amount.min}
          maxAmount={productConstraints.amount.max}
          setAmount={setAmountMock}
          initialAmount={expectedProduct.amount}
        />
      );

      const numberInput = screen.getByRole('spinbutton');
      fireEvent.change(numberInput, { target: { value: productConstraints.amount.min - 1 } });
      expect(numberInput).toHaveValue(productConstraints.amount.min);
    });
  });
});
