import { useAppSelector } from '@/app/hooks';
import { Button } from '@/components/common/Button';
import { List } from '@/components/common/List';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { Review, UserReview, useGetReviewsByProductIdQuery } from '@/features/reviews';
import { CreateReviewForm } from '@/features/reviews/components/CreateReviewForm';
import { useState } from 'react';
import { Product } from '../types';

interface ProductReviewsProps {
  reviews: Review[] | undefined;
  isError: boolean;
  product: Product;
}

export function ProductReviews({ reviews, product, isError }: ProductReviewsProps) {
  const currentUser = useAppSelector(selectCurrentUser);
  const [shouldShowCreateForm, setShouldShowCreateForm] = useState(false);
  const { review } = useGetReviewsByProductIdQuery(product._id, {
    selectFromResult: ({ data }) => ({
      review: data?.find((review) => review.userId === currentUser?._id),
    }),
  });

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
            <h3 className="mb-4 mt-12 text-lg font-bold">Your review</h3>
            {currentUser ? (
              review ? (
                <UserReview product={product} review={review} />
              ) : (
                <>
                  <p className="mb-8">You have not reviewed this product yet!</p>
                  <Button onClick={() => setShouldShowCreateForm(true)}>
                    <span>Create Review</span>
                  </Button>
                </>
              )
            ) : (
              <p className="mb-8">You need to log in to be able to create a review!</p>
            )}
            <h3 className="mt-12 text-lg font-bold">All reviews</h3>
            <List
              className="mt-4 space-y-12"
              items={reviews}
              getKey={({ _id }) => _id}
              renderItem={(review) => <UserReview showAuthor product={product} review={review} />}
              emptyItemsMessage="There are no reviews for this product yet!"
            />
          </>
        )}
      </>
      {shouldShowCreateForm && (
        <CreateReviewForm product={product} close={() => setShouldShowCreateForm(false)} />
      )}
    </section>
  );
}
