import { Review } from '@/app/services/reviews';
import DashboardReview from '../DashboardReview';

interface DashboardReviewListProps {
  reviews: Review[] | undefined;
}

function DashboardReviewList({ reviews }: DashboardReviewListProps) {
  return reviews?.length ? (
    <ul>
      {reviews?.map((review) => (
        <DashboardReview review={review} />
      ))}
    </ul>
  ) : (
    <p className="w-full text-center text-5xl font-bold text-gray-200 md:text-6xl">
      You have no reviews
    </p>
  );
}

export default DashboardReviewList;
