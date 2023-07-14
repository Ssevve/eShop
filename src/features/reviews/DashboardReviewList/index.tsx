import { Review as ReviewType, useGetReviewsByUserIdQuery } from 'app/services/reviews';
import { useGetProductByIdQuery } from 'app/services/products';
import { Link } from 'react-router-dom';
import { selectCurrentUser } from 'features/auth/authSlice';
import { useAppSelector } from 'app/hooks';
import theme from 'lib/theme';
import Loader from 'components/common/Loader';
import Review from '../Review';

function DashboardReview({ review }: { review: ReviewType }) {
  const { data: product, isFetching, isError } = useGetProductByIdQuery(review.productId);

  const imageSize = theme.spacing[20];
  return (
    <li className="border-b pb-6 last-of-type:border-b-0">
      {isFetching ? (
        <Loader />
      ) : (
        <div className="items-center sm:grid sm:grid-cols-2">
          {isError ? (
            <span>Product not available.</span>
          ) : (
            <Link
              className="flex h-full w-max items-center gap-6 hover:underline"
              to={`/products/${product?._id}`}
            >
              <img
                className="h-20 w-20 object-scale-down"
                height={imageSize}
                width={imageSize}
                src={product?.imageUrl}
                alt={product?.name}
              />
              <span>{product?.name}</span>
            </Link>
          )}
          <Review review={review} />
        </div>
      )}
    </li>
  );
}

function DashboardReviewList() {
  const currentUser = useAppSelector(selectCurrentUser);
  const { data: reviews, isFetching, isError } = useGetReviewsByUserIdQuery(currentUser?._id);

  return isFetching ? (
    <Loader />
  ) : reviews?.length ? (
    <ul>
      {reviews?.map((review) => (
        <DashboardReview review={review} />
      ))}
    </ul>
  ) : (
    <p className="my-6">You have no reviews yet!</p>
  );
}

export default DashboardReviewList;
