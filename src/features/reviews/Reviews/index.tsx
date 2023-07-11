import { useGetReviewsByProductIdQuery } from 'app/services/reviews';
import { useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/authSlice';
import Loader from 'components/common/Loader';
import Review from '../Review';
import CurrentUserReview from '../CurrentUserReview';

interface NoReviewsMessageProps {
  isError: boolean;
}

const NoReviewsMessage = ({ isError }: NoReviewsMessageProps) => {
  return isError ? (
    <p className="my-6">There was a problem loading reviews. We are working on it!</p>
  ) : (
    <p className="my-6">There are no reviews for this product yet!</p>
  );
};

interface ReviewsProps {
  productId: string;
}

function Reviews({ productId }: ReviewsProps) {
  const currentUser = useAppSelector(selectCurrentUser);
  const { data: reviews, isFetching, isError } = useGetReviewsByProductIdQuery(productId);

  return (
    <section className="mt-6 w-full">
      <h2 className="text-4xl font-bold">Reviews</h2>
      {currentUser ? (
        <CurrentUserReview productId={productId} currentUserId={currentUser?._id} />
      ) : (
        <p className="my-6">You need to log in to be able to write a review!</p>
      )}
      <section>
        {isFetching ? (
          <Loader />
        ) : (
          <div>
            <h3 className="mt-12 text-lg font-bold">All reviews</h3>
            {reviews?.length ? (
              reviews.map((review) => <Review key={review._id} review={review} />)
            ) : (
              <NoReviewsMessage isError={isError} />
            )}
          </div>
        )}
      </section>
    </section>
  );
}

export default Reviews;
