import { screen } from '@testing-library/react';
import renderWithProviders from 'utils/renderWithProviders';
import { MAX_PRODUCT_RATING } from 'lib/constants';
import StarRating from '.';

describe('StarRating component', () => {
  it('should render correct amount of stars', async () => {
    renderWithProviders(<StarRating rating={2} ratingsCount={3} />);
    expect(await screen.findAllByTitle('star')).toHaveLength(MAX_PRODUCT_RATING);
  });

  it('should render correct amount of gold stars', async () => {
    const rating = 2;
    renderWithProviders(<StarRating rating={rating} ratingsCount={3} />);
    const stars = await screen.findAllByRole('img', { name: 'star' });
    const goldStars = stars.filter((star) => star.getAttribute('fill') === 'gold');
    expect(goldStars).toHaveLength(rating);
  });

  it('should render correct amount of not filled stars', async () => {
    const rating = 2;
    renderWithProviders(<StarRating rating={rating} ratingsCount={3} />);
    const stars = await screen.findAllByRole('img', { name: 'star' });
    const transparentStars = stars.filter((star) => star.getAttribute('fill') === 'transparent');
    expect(transparentStars).toHaveLength(MAX_PRODUCT_RATING - rating);
  });

  it('should render correct amount of ratingsCount', async () => {
    const ratingsCount = 3;
    renderWithProviders(<StarRating rating={2} ratingsCount={ratingsCount} />);
    expect(screen.getByText(`(${ratingsCount} ratings)`)).toBeInTheDocument();
  });
});
