import { useGetProductByIdQuery } from 'app/services/products';
import { Review as ReviewType } from 'app/services/reviews';
import { Link } from 'react-router-dom';
import theme from 'lib/theme';
import Loader from 'components/common/Loader';
import Review from 'features/reviews/Review';

interface DashboardReviewProps {
  review: ReviewType;
}

function DashboardReview({ review }: DashboardReviewProps) {
  const { data: product, isFetching, isError } = useGetProductByIdQuery(review.productId);

  const imageSize = theme.spacing[20];
  return (
    <li className="border-b pb-6 last-of-type:border-b-0">
      {isFetching ? (
        <Loader />
      ) : (
        <div className="items-center sm:grid sm:grid-cols-2">
          {isError ? (
            <span>Product not available</span>
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

export default DashboardReview;