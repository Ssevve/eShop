import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import { Loader } from '../Loader';

describe('Loader component', () => {
  it('should render correctly', () => {
    renderWithProviders(<Loader />);
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });
});
