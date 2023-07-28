import { useAppSelector } from '@/app/hooks';
import { List } from '@/components/common/List';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { EditableUserReview, Review, UserReview } from '@/features/reviews';

interface ProductReviewsProps {
  reviews: Review[] | undefined;
  isError: boolean;
  productId: string;
}

export function ProductReviews({ reviews, productId, isError }: ProductReviewsProps) {
  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <section className="w-full">
      <h2 className="text-4xl font-bold">Reviews</h2>
      <>
        {isError ? (
          <p className="py-6">
            There was a problem getting reviews for this product. Please try again.
          </p>
        ) : (
          <>
            <h3 className="mt-12 text-lg font-bold">Your review</h3>
            {currentUser ? (
              <EditableUserReview userId={currentUser._id} productId={productId} />
            ) : (
              <p className="py-6">You need to log in to be able to create a review!</p>
            )}
            <h3 className="mt-12 text-lg font-bold">All reviews</h3>
            <List
              items={reviews}
              getKey={({ _id }) => _id}
              renderItem={(review) => <UserReview showAuthor review={review} />}
              emptyItemsMessage="There are no reviews for this product yet!"
            />
          </>
        )}
      </>
    </section>
  );
}