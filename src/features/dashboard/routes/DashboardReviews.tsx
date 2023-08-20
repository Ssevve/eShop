import { useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/common/Loader';
import { selectCurrentUser } from '@/features/auth';
import { useGetReviewsByUserIdQuery } from '@/features/reviews';
import { List } from '@/components/common/List';
import { DashboardReview } from '../components/DashboardReview';

export function DashboardReviews() {
  const currentUser = useAppSelector(selectCurrentUser);
  const { data: reviews, isFetching, isError } = useGetReviewsByUserIdQuery(currentUser?._id);

  return isFetching ? (
    <Loader />
  ) : isError ? (
    <p className="text-xl">There was a problem getting your reviews. Try again.</p>
  ) : (
    <List
      items={reviews}
      renderItem={(review) => <DashboardReview review={review} />}
      itemClassName="py-4 last:pb-0 first:pt-0"
      emptyItemsMessage="You have no reviews"
      className="divide-y"
      emptyItemsMessageClass="w-full text-center text-5xl font-bold text-gray-200 md:text-6xl"
      getKey={({ _id }) => _id}
    />
  );
}
