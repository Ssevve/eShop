import { useState } from 'react';
import { useGetReviewsByProductIdQuery } from 'features/reviews/reviewsSlice';
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
    <section>
      <h3 className="my-6 text-lg font-bold">Your review</h3>
      {review ? (
        isEditing ? (
          <EditReviewForm review={review} setIsEditing={setIsEditing} />
        ) : (
          <Review editable review={review} setIsEditing={setIsEditing} />
        )
      ) : (
        <CreateReviewForm productId={productId} />
      )}
    </section>
  );
}

export default CurrentUserReview;
