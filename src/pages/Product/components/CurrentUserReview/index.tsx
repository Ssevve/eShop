import { useState } from 'react';
import { useGetReviewsByProductIdQuery } from 'app/api';
import ReviewForm from '../ReviewForm';
import Review from '../Review';

interface CurrentUserReviewProps {
  productId: string;
  currentUserId: string | undefined;
}

function CurrentUserReview({ productId, currentUserId }: CurrentUserReviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { review } = useGetReviewsByProductIdQuery(productId, {
    selectFromResult: ({ data }) => ({
      review: data?.find((review) => review.userId === currentUserId),
    }),
  });

  return (
    <section>
      <h3 className="my-6 text-lg font-bold">Your review</h3>
      {currentUserId ? (
        <>
          {review ? (
            isEditing ? (
              <ReviewForm isEditForm review={review} setIsEditing={setIsEditing} />
            ) : (
              <Review editable review={review} setIsEditing={setIsEditing} />
            )
          ) : (
            <ReviewForm productId={productId} />
          )}
        </>
      ) : (
        <p className="my-6">You need to log in to be able to write a review!</p>
      )}
    </section>
  );
}

export default CurrentUserReview;
