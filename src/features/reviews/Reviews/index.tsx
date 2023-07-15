import { useGetReviewsByProductIdQuery } from 'app/services/reviews';
import { useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/authSlice';
import Loader from 'components/common/Loader';
import ProductReviewList from '../ProductReviewList';
import EditableUserReview from '../EditableUserReview';

interface ReviewsProps {
  productId: string;
}

function Reviews({ productId }: ReviewsProps) {
  const currentUser = useAppSelector(selectCurrentUser);
  const { data: reviews, isFetching, isError } = useGetReviewsByProductIdQuery(productId);

  return (
    <section className="mt-6 w-full">
      <h2 className="text-4xl font-bold">Reviews</h2>
      {isFetching ? (
        <Loader />
      ) : (
        <>
          <section>
            <h3 className="my-6 text-lg font-bold">Your review</h3>
            {currentUser ? (
              <EditableUserReview productId={productId} currentUserId={currentUser._id} />
            ) : (
              <p className="my-6">You need to log in to be able to write a review!</p>
            )}
          </section>
          <section>
            <h3 className="mt-12 text-lg font-bold">All reviews</h3>
            {isError ? (
              <p className="py-6">
                There was a problem getting reviews for this product. Try again.
              </p>
            ) : (
              <ProductReviewList reviews={reviews} />
            )}
          </section>
        </>
      )}
    </section>
  );
}

export default Reviews;
