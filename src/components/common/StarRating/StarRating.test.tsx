import { screen } from '@testing-library/react';
import renderWithProviders from 'utils/renderWithProviders';
import { productConstraints } from 'lib/constants';
import StarRating from '.';

describe('StarRating component', () => {
  it('should render correct amount of stars', async () => {
    const rating = 2;
    renderWithProviders(<StarRating rating={rating} />);
    expect(screen.getAllByRole('img')).toHaveLength(productConstraints.rating.max);
  });

  it('should render correct amount of filled stars', async () => {
    const rating = 2;
    renderWithProviders(<StarRating rating={rating} />);
    expect(screen.getAllByLabelText(/filled star/i)).toHaveLength(rating);
  });

  it('should render correct amount of empty stars', async () => {
    const rating = 2;
    renderWithProviders(<StarRating rating={rating} />);
    expect(screen.getAllByLabelText(/empty star/i)).toHaveLength(
      productConstraints.rating.max - rating
    );
  });

  it('should render correct ratings count if showRatingsCount and ratingsCount props are provided', async () => {
    const ratingsCount = 3;
    renderWithProviders(<StarRating showRatingsCount rating={2} ratingsCount={ratingsCount} />);
    expect(screen.getByText(`(${ratingsCount} ratings)`)).toBeInTheDocument();
  });

  it('should not render ratings count by default', async () => {
    renderWithProviders(<StarRating rating={2} />);
    expect(screen.queryByText('ratings', { exact: false })).not.toBeInTheDocument();
  });
});
