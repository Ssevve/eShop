import { screen } from '@testing-library/react';
import { describe, test } from 'vitest';
import renderWithProviders from 'utils/renderWithProviders';
import QuantityInput from '.';

const count = 1;
const setCount = () => count + 1;

describe('QuantityInput tests', () => {
  beforeAll(() => {
    renderWithProviders(<QuantityInput count={1} setCount={setCount} />);
  });

  test('renders decrease quantity button', () => {
    expect(screen.getByLabelText('Decrease quantity')).toBeInTheDocument();
  });
});
