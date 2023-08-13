import { useAppSelector } from '@/app/hooks';
import { Button } from '@/components/common/Button';
import { StarRating } from '@/components/common/StarRating';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { Review } from '@/features/reviews';
import { formatDate } from '@/utils/format';
import { ReviewAuthor } from './ReviewAuthor';

interface EditableReviewProps {
  isEditable: true;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

interface NotEditableReviewProps {
  setIsEditing?: never;
  isEditable?: never;
}

type UserReviewProps = {
  review: Review;
  showAuthor?: boolean;
} & (EditableReviewProps | NotEditableReviewProps);

export function UserReview({ review, isEditable, showAuthor, setIsEditing }: UserReviewProps) {
  const currentUser = useAppSelector(selectCurrentUser);

  const isOwnReview = currentUser?._id === review.userId;
  const canBeEdited = isOwnReview && isEditable && setIsEditing;

  return (
    <article className="mt-12 first-of-type:mt-6">
      <div className="flex flex-wrap items-center gap-4">
        {showAuthor && <ReviewAuthor name={review.userFirstName} />}
        <StarRating rating={review.rating} />
      </div>
      <p className="my-4 max-w-2xl">{review.message}</p>
      <div className="flex max-w-max flex-wrap gap-2 text-xs text-gray-400">
        <span className="shrink-0">Created: {formatDate(review.createdAt)}</span>
        {review.updatedAt && (
          <span className="shrink-0">Edited: {formatDate(review.updatedAt)}</span>
        )}
      </div>
      {canBeEdited && (
        <Button
          size="sm"
          className="mt-3"
          variant="neutral-outline"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </Button>
      )}
    </article>
  );
}
