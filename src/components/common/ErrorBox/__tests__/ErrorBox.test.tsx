import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import { ErrorBox } from '../ErrorBox';

describe('ErrorBox component', () => {
  it("should render default title if 'title' prop is not passed in", () => {
    renderWithProviders(<ErrorBox />);
    expect(screen.getByText('Error!')).toBeInTheDocument();
  });

  it("should render default message if 'message' prop is not passed in", () => {
    renderWithProviders(<ErrorBox />);
    expect(screen.getByText('Something went wrong. Please try again.')).toBeInTheDocument();
  });

  it('should render passed in title', () => {
    renderWithProviders(<ErrorBox title="Error title" />);
    expect(screen.queryByText('Error title')).toBeInTheDocument();
  });

  it('should not render passed in error message', () => {
    renderWithProviders(<ErrorBox errorMessage="Error message" />);
    expect(screen.queryByText('Error message')).toBeInTheDocument();
  });
});
