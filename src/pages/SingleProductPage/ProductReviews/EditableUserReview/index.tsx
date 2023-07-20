import { useGetReviewsByProductIdQuery } from '@/app/services/reviews';
import Review from '@/features/reviews/Review';
import { useState } from 'react';
import ReviewForm from '../ReviewForm';

interface EditableUserReviewProps {
  userId: string;
  productId: string;
}

function EditableUserReview({ userId, productId }: EditableUserReviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { review } = useGetReviewsByProductIdQuery(productId, {
    selectFromResult: ({ data }) => ({
      review: data?.find((review) => review.userId === userId),
    }),
  });

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
