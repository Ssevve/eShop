import { Loader } from '@/components/common/Loader';
import { useGetProductByIdQuery } from '@/features/products';
import { useGetReviewsByProductIdQuery } from '@/features/reviews';
import { ErrorPage, NotFoundPage } from '@/routes';
import { useParams } from 'react-router-dom';
import { ProductDetails } from '../components/ProductDetails';
import { ProductReviews } from '../components/ProductReviews';
import { cartsApi } from '@/features/carts';

export function SingleProductPage() {
  const { productId } = useParams();
  const {
    data: product,
    isLoading: isLoadingProduct,
    error: getProductError,
  } = useGetProductByIdQuery(productId);
  const {
    data: reviews,
    isLoading: isLoadingReviews,
    isError: isErrorGetReviews,
  } = useGetReviewsByProductIdQuery(productId);
  const { isUninitialized: isUninitializedCart, isLoading: isLoadingCart } =
    cartsApi.endpoints.getCart.useQueryState();

  const isFetchBaseQueryError = getProductError && 'status' in getProductError;
  if (isFetchBaseQueryError && getProductError.status !== 404) return <ErrorPage />;

  const isLoading = isLoadingProduct || isLoadingReviews || isUninitializedCart || isLoadingCart;

  return isLoading ? (
    <Loader />
  ) : (
    <section className="mx-auto flex w-full max-w-4xl grow flex-col justify-center gap-12 py-4">
      {product ? (
        <>
          <ProductDetails product={product} />
          <ProductReviews reviews={reviews} productId={product._id} isError={isErrorGetReviews} />
        </>
      ) : (
        <NotFoundPage />
      )}
    </section>
  );
}
