import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import { LoaderButton } from '../LoaderButton';

describe('LoaderButton component', () => {
  it('should render a button with correct default type', () => {
    renderWithProviders(<LoaderButton isLoading={false}>Add to cart</LoaderButton>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it("should render a button with correct type if 'type' prop is passed in", () => {
    renderWithProviders(
      <LoaderButton type="submit" isLoading={false}>
        Log in
      </LoaderButton>
    );
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('should render loader if isLoading is true', () => {
    renderWithProviders(<LoaderButton isLoading>Log in</LoaderButton>);
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });

  it('should render children if isLoading is false', () => {
    renderWithProviders(<LoaderButton isLoading={false}>Log in</LoaderButton>);
    expect(screen.getByRole('button')).toHaveTextContent('Log in');
  });

  it("should be disabled if 'disabled' prop is true", () => {
    renderWithProviders(
      <LoaderButton disabled={true} isLoading>
        Log in
      </LoaderButton>
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it("should not be disabled if 'disabled' prop is false", () => {
    renderWithProviders(
      <LoaderButton disabled={false} isLoading={false}>
        Log in
      </LoaderButton>
    );
    expect(screen.getByRole('button')).not.toBeDisabled();
  });
});
