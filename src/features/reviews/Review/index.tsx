import { useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/authSlice';
import { Review as ReviewType } from 'app/services/reviews';
import StarRating from 'components/common/StarRating';
import ReviewAuthor from './ReviewAuthor';
import Button from 'components/common/Button';

interface EditableReviewProps {
  isEditable: true;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

interface NotEditableReviewProps {
  setIsEditing?: never;
  isEditable?: never;
}

type ReviewProps = {
  review: ReviewType;
  showAuthor?: boolean;
} & (EditableReviewProps | NotEditableReviewProps);

function Review({ review, isEditable, showAuthor, setIsEditing }: ReviewProps) {
  const currentUser = useAppSelector(selectCurrentUser);

  const isOwnReview = currentUser?._id === review.userId;
  const canBeEdited = isOwnReview && isEditable && setIsEditing;

  return (
    <article className="mt-12 first-of-type:mt-6">
      <div className="flex flex-wrap items-center gap-4">
        {showAuthor && <ReviewAuthor name={review.userFirstName} />}
        <StarRating rating={review.rating} />
      </div>
      <p className="mt-3 max-w-2xl">{review.message}</p>
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

export default Review;
