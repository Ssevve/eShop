import { screen } from '@testing-library/react';
import renderWithProviders from 'utils/renderWithProviders';
import ErrorBox from '.';

describe('ErrorBox component', () => {
  describe('when isError is true', () => {
    it('should render title', () => {
      renderWithProviders(<ErrorBox isError title="Error title" errorMessage="Error message" />);
      expect(screen.getByText('Error title')).toBeInTheDocument();
    });

    it('should render error message', () => {
      renderWithProviders(<ErrorBox isError title="Error title" errorMessage="Error message" />);
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });
  });

  describe('when isError is false', () => {
    it('should not render title', () => {
      renderWithProviders(
        <ErrorBox isError={false} title="Error title" errorMessage="Error message" />
      );
      expect(screen.queryByText('Error title')).not.toBeInTheDocument();
    });

    it('should not render error message', () => {
      renderWithProviders(
        <ErrorBox isError={false} title="Error title" errorMessage="Error message" />
      );
      expect(screen.queryByText('Error message')).not.toBeInTheDocument();
    });
  });
});
