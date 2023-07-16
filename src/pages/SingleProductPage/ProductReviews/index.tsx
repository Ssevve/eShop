import { useGetReviewsByProductIdQuery } from 'app/services/reviews';
import { useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/authSlice';
import Loader from 'components/common/Loader';
import EditableUserReview from './EditableUserReview';
import List from 'components/common/List';
import Review from 'features/reviews/Review';

interface ProductReviewsProps {
  productId: string;
}

function ProductReviews({ productId }: ProductReviewsProps) {
  const currentUser = useAppSelector(selectCurrentUser);
  const { data: reviews, isFetching, isError } = useGetReviewsByProductIdQuery(productId);

  return (
    <section className="w-full">
      <h2 className="text-4xl font-bold">Reviews</h2>
      {isFetching ? (
        <Loader />
      ) : (
        <>
          {isError ? (
            <p className="py-6">
              There was a problem getting reviews for this product. Please try again.
            </p>
          ) : (
            <>
              <h3 className="mt-12 text-lg font-bold">Your review</h3>
              {currentUser ? (
                <EditableUserReview userId={currentUser._id} productId={productId} />
              ) : (
                <p className="py-6">You need to log in to be able to create a review!</p>
              )}
              <h3 className="mt-12 text-lg font-bold">All reviews</h3>
              <List
                items={reviews}
                getKey={({ _id }) => _id}
                renderItem={(review) => <Review showAuthor review={review} />}
                noItemsMessage="There are no reviews for this product yet!"
              />
            </>
          )}
        </>
      )}
    </section>
  );
}

export default ProductReviews;
