import { useGetReviewsByUserIdQuery } from 'app/services/reviews';
import { selectCurrentUser } from 'features/auth/authSlice';
import { useAppSelector } from 'app/hooks';
import Loader from 'components/common/Loader';
import DashboardReviewList from './DashboardReviewList';

function DashboardReviews() {
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

export default DashboardReviews;