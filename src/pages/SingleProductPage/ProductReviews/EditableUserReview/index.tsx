import { useState } from 'react';
import { useGetReviewsByProductIdQuery } from 'app/services/reviews';
import Review from 'features/reviews/Review';
import ReviewForm from '../ReviewForm';

interface EditableUserReviewProps {
  userId: string;
  productId: string;
}

function EditableUserReview({ userId, productId }: EditableUserReviewProps) {
  const { review } = useGetReviewsByProductIdQuery(productId, {
    selectFromResult: ({ data }) => ({
      review: data?.find((review) => review.userId === userId),
    }),
  });
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {review ? (
        isEditing ? (
          <ReviewForm isEditForm review={review} setIsEditing={setIsEditing} />
        ) : (
          <Review isEditable review={review} setIsEditing={setIsEditing} />
        )
      ) : (
        <ReviewForm productId={productId} />
      )}
    </>
  );
}

export default EditableUserReview;
