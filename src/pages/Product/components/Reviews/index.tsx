import { useGetReviewsByProductIdQuery } from 'app/api';
import { useAppSelector } from 'app/hooks';
import Loader from 'components/common/Loader';

import { selectCurrentUser } from 'features/auth/authSlice';
import AddReviewForm from '../AddReviewForm';
import EditReviewForm from '../EditReviewForm';
import Review from '../Review';
import { useMemo, useState } from 'react';

interface ReviewsProps {
  productId: string;
}

function Reviews({ productId }: ReviewsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const currentUser = useAppSelector(selectCurrentUser);
  const {
    data: reviews,
    isFetching: isFetchingReviews,
    error,
  } = useGetReviewsByProductIdQuery(productId);
  const currentUserReview = useMemo(
    () => reviews?.find((review) => review.userId === currentUser?.uid),
    [currentUser?.uid, productId, reviews]
  );

  return (
    <section className="mt-6">
      <h2 className="text-4xl font-bold">Reviews</h2>
      {currentUser ? (
        <>
          <h3 className="my-6 text-lg font-bold">Your review</h3>
          {currentUserReview ? (
            isEditing ? (
              <EditReviewForm review={currentUserReview} setIsEditing={setIsEditing} />
            ) : (
              <Review shouldShowControls review={currentUserReview} setIsEditing={setIsEditing} />
            )
          ) : (
            <AddReviewForm userId={currentUser.uid} productId={productId} />
          )}
        </>
      ) : (
        <p className="my-6">You need to log in to be able to write a review!</p>
      )}
      <section>
        {isFetchingReviews ? (
          <Loader />
        ) : (
          <div>
            <h3 className="mt-12 text-lg font-bold">All reviews</h3>
            {reviews?.length ? (
              reviews.map((review) => (
                <Review key={review._id} review={review} setIsEditing={setIsEditing} />
              ))
            ) : error ? (
              <p className="my-6">There was a problem loading reviews. We are working on it!</p>
            ) : (
              <p className="my-6">There are no reviews for this product yet!</p>
            )}
          </div>
        )}
      </section>
    </section>
  );
}

export default Reviews;
