import { screen } from '@testing-library/react';
import renderWithProviders from 'utils/renderWithProviders';
import mockReviews from 'mocks/reviews';
import loggedInUserStateMock from 'mocks/loggedInUserState';
import ProductReviews from '.';

describe('ProductReviews', () => {
  it("should render 'Reviews' heading", () => {
    renderWithProviders(
      <ProductReviews reviews={mockReviews} isError={false} productId={mockReviews[0].productId} />
    );
    expect(screen.getByRole('heading', { level: 2, name: /reviews/i })).toBeInTheDocument();
  });

  it('should render error message if isError is true', () => {
    renderWithProviders(
      <ProductReviews reviews={mockReviews} isError={true} productId={mockReviews[0].productId} />
    );
    expect(
      screen.getByText('There was a problem getting reviews for this product. Please try again.')
    ).toBeInTheDocument();
  });

  it("should render 'Your review' heading", () => {
    renderWithProviders(
      <ProductReviews reviews={mockReviews} isError={false} productId={mockReviews[0].productId} />
    );
    expect(screen.getByRole('heading', { level: 3, name: /your review/i })).toBeInTheDocument();
  });

  it('should render <EditableUserReview /> component if user is logged in', () => {
    renderWithProviders(
      <ProductReviews reviews={mockReviews} isError={false} productId={mockReviews[0].productId} />,
      {
        preloadedState: loggedInUserStateMock,
      }
    );
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('should tell a user to log in to be able create a review', () => {
    renderWithProviders(
      <ProductReviews reviews={mockReviews} isError={false} productId={mockReviews[0].productId} />
    );
    expect(
      screen.getByText('You need to log in to be able to create a review!')
    ).toBeInTheDocument();
  });

  it("should render 'All reviews' heading", () => {
    renderWithProviders(
      <ProductReviews reviews={mockReviews} isError={false} productId={mockReviews[0].productId} />
    );
    expect(screen.getByRole('heading', { level: 3, name: /all reviews/i })).toBeInTheDocument();
  });

  it('should render <List /> component', () => {
    const expectedReview = mockReviews[0];
    renderWithProviders(
      <ProductReviews reviews={mockReviews} isError={false} productId={mockReviews[0].productId} />
    );
    expect(screen.getByText(expectedReview.userFirstName)).toBeInTheDocument();
  });
});
