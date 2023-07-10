import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from 'features/products/productsSlice';
import { useAppDispatch } from 'app/hooks';
import { addCartProduct } from 'features/cart/cartSlice';
import { productConstraints } from 'lib/constants';
import PriceGroup from 'components/common/PriceGroup';
import StarRating from 'components/common/StarRating';
import Button from 'components/common/Button';
import NotFoundPage from 'pages/NotFoundPage';
import Loader from 'components/common/Loader';
import ErrorPage from 'pages/ErrorPage';
import QuantityInput from 'components/common/QuantityInput';
import Reviews from 'pages/Product/components/Reviews';

function SingleProductPage() {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(productConstraints.quantity.min);
  const { productId } = useParams();
  const { data: product, isFetching, error } = useGetProductByIdQuery(productId);

  const addToCart = () => {
    if (product) {
      dispatch(addCartProduct({ quantity, product }));
    }
  };

  if (isFetching) return <Loader />;

  const isFetchBaseQueryError = error && 'data' in error;
  if (isFetchBaseQueryError && error.status !== 404 && error.status !== 400) return <ErrorPage />;

  if (!product) return <NotFoundPage />;
  return (
    <section className="mx-auto w-full max-w-4xl gap-12">
      <div className="mb-12 flex flex-1 flex-wrap items-center justify-center gap-12">
        <img className="w-full max-w-sm" src={product.imageUrl} alt={product.name} />
        <div className="flex flex-1 flex-col gap-6">
          <header className="grid gap-y-3">
            <h1 className="text-4xl font-bold leading-tight">{product.name}</h1>
            <span className="mb-3 text-sm font-bold uppercase text-gray-400">
              {product.category}
            </span>
            <StarRating
              rating={product.rating}
              showRatingsCount
              ratingsCount={product.ratingsCount}
            />
          </header>
          <section>
            <p>
              <span className="mr-1 font-semibold">Brand:</span>
              {product.brand}
            </p>
            <p>
              <span className="mr-1 font-semibold">Quantity:</span>
              {product.quantity}
            </p>
          </section>
          <p className="break-words">{product.description}</p>
          <PriceGroup price={product.price} discountPrice={product.discountPrice} />
          <footer className="flex gap-6">
            <QuantityInput count={quantity} setCount={setQuantity} />
            <Button onClick={addToCart}>Add to cart</Button>
          </footer>
        </div>
      </div>
      {productId && <Reviews productId={productId} />}
    </section>
  );
}

export default SingleProductPage;
