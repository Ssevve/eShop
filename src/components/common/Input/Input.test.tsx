import { screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import renderWithProviders from 'utils/renderWithProviders';
import Input from '.';

describe('Input', () => {
  test('Renders an input with correct label text', () => {
    renderWithProviders(<Input label="Username" type="text" />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  });

  test('Renders an error message if present', () => {
    const error = {
      type: 'required',
      message: 'Error message',
    };
    renderWithProviders(<Input label="Username" type="text" error={error} />);
    expect(screen.getByText(/error message/i)).toBeInTheDocument();
  });
});
