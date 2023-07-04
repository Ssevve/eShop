import { useAddReviewMutation, useGetReviewsByIdQuery } from 'app/api';
import { useAppSelector } from 'app/hooks';
import PageLoader from 'components/common/PageLoader';
import StarRating from 'components/common/StarRating';
import SubmitButton from 'components/common/SubmitButton';
import { selectCurrentUser } from 'features/auth/authSlice';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FiStar } from 'react-icons/fi';
import theme from 'lib/theme';

interface ReviewsProps {
  productId: string | undefined;
}

interface NewReviewSchema {
  rating: number;
  message: string;
}

function Reviews({ productId }: ReviewsProps) {
  const currentUser = useAppSelector(selectCurrentUser);
  const { data: reviews, isFetching: isFetchingReviews, error } = useGetReviewsByIdQuery(productId);
  const [addReview, { isLoading: isAddingReview }] = useAddReviewMutation();
  const { register, handleSubmit } = useForm<NewReviewSchema>();

  const onSubmit: SubmitHandler<NewReviewSchema> = ({ rating, message }: NewReviewSchema) =>
    addReview({ productId, userId: currentUser?.uid, message, rating });

  return (
    <section className="mt-6 p-3">
      <h2 className="text-4xl font-bold">Reviews</h2>
      {currentUser ? (
        <>
          <h3 className="my-6 text-lg font-bold">Your review</h3>
          <form className="my-6" onSubmit={handleSubmit(onSubmit)}>
            <h4 className="mb-3 font-semibold">Rating</h4>
            <ul className="rounded-sm border bg-white font-medium sm:flex">
              <li className="w-full border-b sm:border-b-0 sm:border-r">
                <label className="flex h-full w-full items-center justify-center p-3 hover:cursor-pointer">
                  <input
                    {...register('rating')}
                    className="relative mr-1 h-4 w-4 appearance-none rounded-full border after:absolute checked:border-primary checked:after:left-1/2 checked:after:top-1/2 checked:after:h-2.5 checked:after:w-2.5 checked:after:rounded-full checked:after:bg-primary checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer"
                    type="radio"
                  />
                  <span className="mr-1.5">1</span>{' '}
                  <FiStar strokeWidth={0} fill={theme.colors.amber[300]} />
                </label>
              </li>
              <li className="w-full border-b sm:border-b-0 sm:border-r">
                <label className="flex h-full w-full items-center justify-center p-3 hover:cursor-pointer">
                  <input
                    {...register('rating')}
                    className="relative mr-1 h-4 w-4 appearance-none rounded-full border after:absolute checked:border-primary checked:after:left-1/2 checked:after:top-1/2 checked:after:h-2.5 checked:after:w-2.5 checked:after:rounded-full checked:after:bg-primary checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer"
                    type="radio"
                  />
                  <span className="mr-1.5">2</span>{' '}
                  <FiStar strokeWidth={0} fill={theme.colors.amber[300]} />
                </label>
              </li>
              <li className="w-full border-b sm:border-b-0 sm:border-r">
                <label className="flex h-full w-full items-center justify-center p-3 hover:cursor-pointer">
                  <input
                    {...register('rating')}
                    className="relative mr-1 h-4 w-4 appearance-none rounded-full border after:absolute checked:border-primary checked:after:left-1/2 checked:after:top-1/2 checked:after:h-2.5 checked:after:w-2.5 checked:after:rounded-full checked:after:bg-primary checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer"
                    type="radio"
                  />
                  <span className="mr-1.5">3</span>{' '}
                  <FiStar strokeWidth={0} fill={theme.colors.amber[300]} />
                </label>
              </li>
              <li className="w-full border-b sm:border-b-0 sm:border-r">
                <label className="flex h-full w-full items-center justify-center p-3 hover:cursor-pointer">
                  <input
                    {...register('rating')}
                    className="relative mr-1 h-4 w-4 appearance-none rounded-full border after:absolute checked:border-primary checked:after:left-1/2 checked:after:top-1/2 checked:after:h-2.5 checked:after:w-2.5 checked:after:rounded-full checked:after:bg-primary checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer"
                    type="radio"
                  />
                  <span className="mr-1.5">4</span>{' '}
                  <FiStar strokeWidth={0} fill={theme.colors.amber[300]} />
                </label>
              </li>
              <li className="w-full">
                <label className="flex h-full w-full items-center justify-center p-3 hover:cursor-pointer">
                  <input
                    {...register('rating')}
                    className="relative mr-1 h-4 w-4 appearance-none rounded-full border after:absolute checked:border-primary checked:after:left-1/2 checked:after:top-1/2 checked:after:h-2.5 checked:after:w-2.5 checked:after:rounded-full checked:after:bg-primary checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer"
                    type="radio"
                  />
                  <span className="mr-1.5">5</span>{' '}
                  <FiStar strokeWidth={0} fill={theme.colors.amber[300]} />
                </label>
              </li>
            </ul>
            <label className="my-6 block font-semibold">
              Message
              <textarea
                {...register('message')}
                className="mt-3 w-0 min-w-full rounded-sm border p-2"
              />
            </label>
            <SubmitButton text="Send review" isLoading={isAddingReview} />
          </form>
        </>
      ) : (
        <p className="my-6">You need to log in to be able to write a review!</p>
      )}
      <section>
        {isFetchingReviews ? (
          <PageLoader />
        ) : (
          <div>
            <h3 className="my-6 text-lg font-bold">Other reviews</h3>
            {reviews?.map((review) => (
              <article key={review._id} className="mt-12 first-of-type:mt-6">
                <div className="mb-3 flex items-center space-x-3">
                  <img className="h-10 w-10 rounded-full" src="https://i.pravatar.cc/300" alt="" />
                  <p className="font-medium">Author</p>
                </div>
                <StarRating rating={review.rating} />
                <p className="mt-2">{review.message}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}

export default Reviews;
