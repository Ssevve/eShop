import { screen } from '@testing-library/react';
import renderWithProviders from 'utils/renderWithProviders';
import userEvent from '@testing-library/user-event';
import {
  loggedInUserWithoutReviewsStateMock,
  loggedInUserWithReviewsStateMock,
} from 'mocks/stateMock';
import { userWithoutReviewMock, userWithReviewMock } from 'mocks/userMock';
import reviewsMock from 'mocks/reviewsMock';
import productsMock from 'mocks/productsMock';
import EditableUserReview from '.';

describe('EditableUserReview', () => {
  it('should render create review form if user has not reviewed the product yet', () => {
    renderWithProviders(
      <EditableUserReview userId={userWithoutReviewMock._id} productId={productsMock[0]._id} />,
      { preloadedState: loggedInUserWithoutReviewsStateMock }
    );
    expect(screen.getByRole('form', { name: /create review/i })).toBeInTheDocument();
  });

  it('should render review if user has reviewed the product and is not editing it', async () => {
    const expectedReview = reviewsMock[0];
    renderWithProviders(
      <EditableUserReview userId={userWithReviewMock._id} productId={expectedReview.productId} />,
      { preloadedState: loggedInUserWithReviewsStateMock }
    );
    expect(await screen.findByRole('form')).not.toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /edit/i })).toBeInTheDocument();
  });

  it('should render edit review form if user is editing a review', async () => {
    const user = userEvent.setup();
    const expectedReview = reviewsMock[0];
    renderWithProviders(
      <EditableUserReview userId={userWithReviewMock._id} productId={expectedReview.productId} />,
      { preloadedState: loggedInUserWithReviewsStateMock }
    );
    await screen.findByRole('button', { name: /edit/i });
    await user.click(await screen.findByRole('button', { name: /edit/i }));
    expect(screen.getByRole('form', { name: /edit review/i })).toBeInTheDocument();
  });
});
