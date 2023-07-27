import { Loader } from '@/components/common/Loader';
import { useGetProductByIdQuery } from '@/features/products';
import { useGetReviewsByProductIdQuery } from '@/features/reviews';
import { ErrorPage, NotFoundPage } from '@/routes';
import { useParams } from 'react-router-dom';
import { ProductDetails } from '../components/ProductDetails';
import { ProductReviews } from '../components/ProductReviews';

export function SingleProductPage() {
  const { productId } = useParams();
  const { data: product, isLoading: isLoadingProduct, error } = useGetProductByIdQuery(productId);
  const {
    data: reviews,
    isLoading: isLoadingReviews,
    isError,
  } = useGetReviewsByProductIdQuery(productId);

  const isFetchBaseQueryError = error && 'status' in error;
  if (isFetchBaseQueryError && error.status !== 404) return <ErrorPage />;

  const isLoading = isLoadingProduct || isLoadingReviews;

  return isLoading ? (
    <Loader />
  ) : (
    <section className="mx-auto flex w-full max-w-4xl grow flex-col justify-center gap-12">
      {product ? (
        <>
          <ProductDetails product={product} />
          <ProductReviews reviews={reviews} productId={product._id} isError={isError} />
        </>
      ) : (
        <NotFoundPage />
      )}
    </section>
  );
}
