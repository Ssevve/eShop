import { useState } from 'react';
import { useGetReviewsByProductIdQuery } from 'app/services/reviews';
import CreateReviewForm from '../CreateReviewForm';
import EditReviewForm from '../EditReviewForm';
import Review from '../Review';

interface CurrentUserReviewProps {
  productId: string;
  currentUserId: string;
}

function CurrentUserReview({ productId, currentUserId }: CurrentUserReviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { review } = useGetReviewsByProductIdQuery(productId, {
    selectFromResult: ({ data }) => ({
      review: data?.find((review) => review.userId === currentUserId),
    }),
  });

  return (
    <>
      {review ? (
        isEditing ? (
          <EditReviewForm review={review} setIsEditing={setIsEditing} />
        ) : (
          <Review editable review={review} setIsEditing={setIsEditing} />
        )
      ) : (
        <CreateReviewForm productId={productId} />
      )}
    </>
  );
}

export default CurrentUserReview;
