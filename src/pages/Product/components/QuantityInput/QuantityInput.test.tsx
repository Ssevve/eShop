import { screen } from '@testing-library/react';
import renderWithProviders from 'utils/renderWithProviders';
import QuantityInput from '.';

const count = 1;
const setCount = () => count + 1;

describe('QuantityInput component', () => {
  describe('number input element', () => {
    renderWithProviders(<QuantityInput count={1} setCount={setCount} />);
    it('should have correct initial value', () => {
      expect(screen.getByRole('spinbutton')).toHaveValue(1);
    });
  });

  describe('decrease quantity button', () => {
    it('should not decrease quantity if value equals 1', () => {
      renderWithProviders(<QuantityInput count={1} setCount={setCount} />);
      // user event
    });
    it('should decrease quantity if value is greater than 1', () => {
      renderWithProviders(<QuantityInput count={2} setCount={setCount} />);
      // user event
    });
  });

  describe('increase quantity button', () => {
    it('should not increase quantity if value equals 99', () => {
      renderWithProviders(<QuantityInput count={99} setCount={setCount} />);
      // user event
    });
    it('should increase quantity if value is less than 99', () => {
      renderWithProviders(<QuantityInput count={93} setCount={setCount} />);
      // user event
    });
  });
});
