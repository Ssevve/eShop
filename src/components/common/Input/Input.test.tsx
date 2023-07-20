import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import Input from '.';

describe('Input component', () => {
  it('should render an input with correct label text', () => {
    renderWithProviders(<Input label="Username" type="text" />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  });

  it('should render an error message if it is defined', () => {
    const error = {
      type: 'required',
      message: 'Error message',
    };
    renderWithProviders(<Input label="Username" type="text" error={error} />);
    expect(screen.getByText(/error message/i)).toBeInTheDocument();
  });
});
