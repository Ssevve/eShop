import { useAppSelector } from 'app/hooks';
import cherryAvatar from 'assets/avatar-cherry.svg';
import StarRating from 'components/common/StarRating';
import { selectCurrentUser } from 'features/auth/authSlice';
import ReviewType from 'types/Review';

interface ReviewProps {
  review: ReviewType;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  shouldShowControls?: boolean;
}

function Review({ review, shouldShowControls = false, setIsEditing }: ReviewProps) {
  const currentUser = useAppSelector(selectCurrentUser);

  const isOwnReview = currentUser?._id === review.userId;

  return (
    <article className="mt-12 first-of-type:mt-6">
      <div className="flex">
        <img className="h-10 w-10 rounded-full" src={cherryAvatar} alt="" />
        <div className="ml-3">
          <div className="mb-3 flex gap-3">
            <p className="font-medium">{review.userFirstName}</p>
            <StarRating rating={review.rating} />
          </div>
          <p className="mt-3 max-w-2xl">{review.message}</p>
          {isOwnReview && shouldShowControls && (
            <button
              onClick={() => setIsEditing(true)}
              className="mt-3 inline-block rounded-sm border bg-white px-3 py-1.5 text-xs font-medium hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default Review;
