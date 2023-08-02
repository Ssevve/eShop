import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import { LoaderButton } from '../LoaderButton';

describe('LoaderButton component', () => {
  it('should render a button with correct default type', () => {
    renderWithProviders(<LoaderButton isLoading={false}>Add to cart</LoaderButton>);
    expect(screen.getByRole('button', { name: /add to cart/i })).toHaveAttribute('type', 'button');
  });

  it("should render a button with correct type if 'type' prop is passed in", () => {
    renderWithProviders(
      <LoaderButton type="submit" isLoading={false}>
        Log in
      </LoaderButton>
    );
    expect(screen.getByRole('button', { name: /log in/i })).toHaveAttribute('type', 'submit');
  });

  describe('when isLoading is false', () => {
    it('should render children', () => {
      renderWithProviders(<LoaderButton isLoading={false}>Log in</LoaderButton>);
      expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
    });

    it('should not be disabled', () => {
      renderWithProviders(<LoaderButton isLoading={false}>Log in</LoaderButton>);
      expect(screen.getByRole('button')).not.toBeDisabled();
    });
  });

  describe('when isLoading is true', () => {
    it('should render loader', () => {
      renderWithProviders(<LoaderButton isLoading>Log in</LoaderButton>);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('should be disabled', () => {
      renderWithProviders(<LoaderButton isLoading>Log in</LoaderButton>);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });
});
