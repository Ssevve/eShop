import { useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/common/Loader';
import { selectCurrentUser } from '@/features/auth';
import { useGetReviewsByUserIdQuery } from '@/features/reviews';
import { DashboardReviewList } from '../components/DashboardReviewList';

export function DashboardReviews() {
  const currentUser = useAppSelector(selectCurrentUser);
  const { data: reviews, isFetching, isError } = useGetReviewsByUserIdQuery(currentUser?._id);

  return isFetching ? (
    <Loader />
  ) : isError ? (
    <p className="text-xl">There was a problem getting your reviews. Try again.</p>
  ) : (
    <DashboardReviewList reviews={reviews} />
  );
}
