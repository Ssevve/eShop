import { useState } from 'react';
import { useGetReviewsByProductIdQuery } from '../api';
import { UserReview } from '../components/UserReview';
import { ReviewForm } from './ReviewForm';

interface EditableUserReviewProps {
  userId: string;
  productId: string;
}

export function EditableUserReview({ userId, productId }: EditableUserReviewProps) {
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
          <UserReview isEditable review={review} setIsEditing={setIsEditing} />
        )
      ) : (
        <ReviewForm productId={productId} />
      )}
    </>
  );
}
