import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from 'app/services/products';
import { useAppDispatch } from 'app/hooks';
import { addCartProduct } from 'features/cart/cartSlice';
import { productConstraints } from 'lib/constants';
import PriceGroup from 'components/common/PriceGroup';
import StarRating from 'components/common/StarRating';
import Button from 'components/common/Button';
import NotFound from 'pages/NotFound';
import PageLoader from 'components/common/PageLoader';
import Error from 'pages/Error';
import QuantityInput from 'components/common/QuantityInput';

function Product() {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(productConstraints.quantity.min);
  const { id } = useParams();
  const { data: product, isFetching, error } = useGetProductByIdQuery(id);

  const handleAddToCartClick = () => {
    if (product) {
      dispatch(addCartProduct({ quantity, product }));
    }
  };

  const isFetchBaseQueryError = error && 'data' in error;
  if (isFetchBaseQueryError) {
    if (error.status === 404) return <NotFound />;
    return <Error />;
  }

  if (isFetching) return <PageLoader />;
  return (
    <section className="m-auto flex w-full flex-wrap items-center justify-center gap-8">
      {product && (
        <>
          <img className="w-full max-w-sm" src={product.imageUrl} alt={product.name} />
          <section className="flex w-full max-w-lg flex-col gap-6">
            <header className="grid gap-y-3">
              <h1 className="text-4xl font-bold leading-tight">{product.name}</h1>
              <span className="mb-3 text-sm font-bold uppercase text-gray-400">
                {product.category}
              </span>
              <StarRating rating={product.rating} ratingsCount={product.ratingsCount} />
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
              <Button onClick={handleAddToCartClick}>Add to cart</Button>
            </footer>
          </section>
        </>
      )}
    </section>
  );
}

export default Product;
