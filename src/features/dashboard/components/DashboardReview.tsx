import { Loader } from '@/components/common/Loader';
import { useGetProductByIdQuery } from '@/features/products';
import { Review, UserReview } from '@/features/reviews';
import theme from '@/lib/theme';
import { Link } from 'react-router-dom';

interface DashboardReviewProps {
  review: Review;
}

export function DashboardReview({ review }: DashboardReviewProps) {
  const { data: product, isFetching, isError } = useGetProductByIdQuery(review.productId);

  const imageSize = theme.spacing[20];
  return isFetching ? (
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
      {product && <UserReview product={product} review={review} />}
    </div>
  );
}
