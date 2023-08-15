import { useAppSelector } from '@/app/hooks';
import cherryAvatar from '@/assets/avatar-cherry.svg';
import { Button } from '@/components/common/Button';
import { StarRating } from '@/components/common/StarRating';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { Product } from '@/features/products';
import { Review } from '@/features/reviews';
import theme from '@/lib/theme';
import { formatDate } from '@/utils/format';
import { useState } from 'react';
import { EditReviewForm } from './EditReviewForm';

type UserReviewProps = {
  product: Product;
  review: Review;
  showAuthor?: boolean;
};

export function UserReview({ review, product, showAuthor = false }: UserReviewProps) {
  const currentUser = useAppSelector(selectCurrentUser);
  const [isEditing, setIsEditing] = useState(false);

  const isOwnReview = currentUser?._id === review.userId;

  return (
    <article>
      <div className="flex flex-wrap items-center gap-4">
        {showAuthor && (
          <>
            <img
              className="h-10 w-10 rounded-full"
              width={theme.spacing[10]}
              height={theme.spacing[10]}
              src={cherryAvatar}
              alt=""
            />
            <p className="font-medium">{review.userFirstName}</p>
          </>
        )}
        <StarRating rating={review.rating} />
      </div>
      <p className="my-4 max-w-2xl">{review.message}</p>
      <div className="flex max-w-max flex-wrap gap-x-4 gap-y-2 text-xs text-gray-400">
        <span className="shrink-0">Created: {formatDate(review.createdAt)}</span>
        {review.updatedAt && (
          <span className="shrink-0">Edited: {formatDate(review.updatedAt)}</span>
        )}
      </div>
      {isOwnReview && (
        <Button
          size="sm"
          className="mt-3"
          variant="neutral-outline"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </Button>
      )}
      {isEditing && (
        <EditReviewForm product={product} review={review} close={() => setIsEditing(false)} />
      )}
    </article>
  );
}
