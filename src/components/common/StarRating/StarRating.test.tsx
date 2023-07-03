import { screen } from '@testing-library/react';
import renderWithProviders from 'utils/renderWithProviders';
import { productConstraints } from 'lib/constants';
import formatRating from './formatRating';
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

  it('should render correctly formatted rating', async () => {
    const rating = 3;
    renderWithProviders(<StarRating rating={rating} />);
    expect(screen.getByText(formatRating(rating))).toBeInTheDocument();
  });

  it('should render ratings count if it is provided', async () => {
    const ratingsCount = 3;
    renderWithProviders(<StarRating rating={2} ratingsCount={ratingsCount} />);
    expect(screen.getByText(`(${ratingsCount} ratings)`)).toBeInTheDocument();
  });
});
