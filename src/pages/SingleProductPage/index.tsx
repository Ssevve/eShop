import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from 'app/services/products';
import { useGetReviewsByProductIdQuery } from 'app/services/reviews';
import Loader from 'components/common/Loader';
import ErrorPage from 'pages/ErrorPage';
import ProductReviews from './ProductReviews';
import Product from './Product';
import NotFoundPage from 'pages/NotFoundPage';

function SingleProductPage() {
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
          <Product product={product} />
          <ProductReviews reviews={reviews} productId={product._id} isError={isError} />
        </>
      ) : (
        <NotFoundPage />
      )}
    </section>
  );
}

export default SingleProductPage;
