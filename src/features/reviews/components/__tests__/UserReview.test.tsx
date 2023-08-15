import { productsMock, reviewsMock, loggedInUserWithReviewsStateMock as stateMock } from '@/mocks';
import { formatDate } from '@/utils/format';
import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { UserReview } from '../UserReview';

describe('UserReview component', () => {
  it('should not render author by default', () => {
    const expectedProduct = productsMock[0];
    const expectedReview = reviewsMock[0];
    renderWithProviders(<UserReview review={expectedReview} product={expectedProduct} />);
    expect(screen.queryByText(expectedReview.userFirstName)).not.toBeInTheDocument();
  });

  it("should render author if 'showAuthor' prop is provided", () => {
    const expectedProduct = productsMock[0];
    const expectedReview = reviewsMock[0];
    renderWithProviders(
      <UserReview review={expectedReview} product={expectedProduct} showAuthor />
    );
    expect(screen.getByText(expectedReview.userFirstName)).toBeInTheDocument();
  });

  it('should render <StarRating /> component', () => {
    const expectedProduct = productsMock[0];
    const expectedReview = reviewsMock[0];
    renderWithProviders(
      <UserReview review={expectedReview} product={expectedProduct} showAuthor />
    );
    expect(screen.getByLabelText(/filled star/i)).toBeInTheDocument();
  });

  it("should render review's message", () => {
    const expectedProduct = productsMock[0];
    const expectedReview = reviewsMock[0];
    renderWithProviders(
      <UserReview review={expectedReview} product={expectedProduct} showAuthor />
    );
    expect(screen.getByText(expectedReview.message!)).toBeInTheDocument();
  });

  it("should render review's created at date", () => {
    const expectedProduct = productsMock[0];
    const expectedReview = reviewsMock[0];
    renderWithProviders(
      <UserReview review={expectedReview} product={expectedProduct} showAuthor />
    );
    expect(
      screen.getByText(formatDate(expectedReview.createdAt), { exact: false })
    ).toBeInTheDocument();
  });

  it("should render review's updated at date if present", () => {
    const expectedProduct = productsMock[0];
    const expectedReview = reviewsMock[0];
    renderWithProviders(
      <UserReview review={expectedReview} product={expectedProduct} showAuthor />
    );
    expect(
      screen.getByText(formatDate(expectedReview.updatedAt!), { exact: false })
    ).toBeInTheDocument();
  });

  it('should not try to render updated at date if it is not present', () => {
    const expectedProduct = productsMock[0];
    const expectedReview = reviewsMock[1];
    renderWithProviders(
      <UserReview review={expectedReview} product={expectedProduct} showAuthor />
    );
    expect(screen.queryByText(/edited/i, { exact: false })).not.toBeInTheDocument();
  });

  it("should not render 'Edit' button if review does not belong to the user", () => {
    const expectedProduct = productsMock[0];
    const expectedReview = reviewsMock[1];
    renderWithProviders(
      <UserReview review={expectedReview} product={expectedProduct} showAuthor />,
      {
        preloadedState: stateMock,
      }
    );
    expect(screen.queryByRole('button', { name: /edit/i })).not.toBeInTheDocument();
  });

  it("should render 'Edit' button for user's own review", () => {
    const expectedProduct = productsMock[0];
    const expectedReview = reviewsMock[0];
    renderWithProviders(
      <UserReview review={expectedReview} product={expectedProduct} showAuthor />,
      {
        preloadedState: stateMock,
      }
    );
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
  });

  it("should open <EditReviewForm /> on 'Edit' button click", async () => {
    const expectedProduct = productsMock[0];
    const expectedReview = reviewsMock[0];
    const user = userEvent.setup();
    renderWithProviders(
      <BrowserRouter>
        <UserReview review={expectedReview} product={expectedProduct} showAuthor />
      </BrowserRouter>,
      {
        preloadedState: stateMock,
      }
    );
    await user.click(screen.getByRole('button', { name: /edit/i }));
    expect(screen.getByRole('form', { name: /edit review/i })).toBeInTheDocument();
  });
});
