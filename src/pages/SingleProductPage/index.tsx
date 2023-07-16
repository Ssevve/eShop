import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from 'app/services/products';
import Loader from 'components/common/Loader';
import ErrorPage from 'pages/ErrorPage';
import ProductReviews from './ProductReviews';
import Product from './Product';
import NotFoundPage from 'pages/NotFoundPage';

function SingleProductPage() {
  const { productId } = useParams();
  const { data: product, isFetching, error } = useGetProductByIdQuery(productId);

  const isFetchBaseQueryError = error && 'status' in error;
  if (isFetchBaseQueryError && error.status !== 404) return <ErrorPage />;

  return isFetching ? (
    <Loader />
  ) : (
    <section className="mx-auto flex w-full max-w-4xl grow flex-col gap-12">
      {product ? (
        <>
          <Product product={product} />
          <ProductReviews productId={product._id} />
        </>
      ) : (
        <NotFoundPage />
      )}
    </section>
  );
}

export default SingleProductPage;
