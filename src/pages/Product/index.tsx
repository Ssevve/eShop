import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from 'services/api';
import PriceGroup from 'components/common/PriceGroup';
import StarRating from 'components/common/StarRating/StarRating';
import Button from 'components/common/Button';
import NotFound from 'pages/NotFound';
import PageLoader from 'components/common/PageLoader';
import Error from 'pages/Error';
import QuantityInput from './components/QuantityInput';

function Product() {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { data: product, isFetching, error } = useGetProductByIdQuery(id);

  // Make sure the error is of type FetchBaseQueryError and check for response status
  if (error && 'data' in error) {
    if (error.status === 404) return <NotFound />;
    return <Error />;
  }

  if (isFetching) return <PageLoader />;
  return (
    <section className="container m-auto flex flex-wrap items-center justify-center gap-8">
      {product && (
        <>
          <img className="max-w-sm" src={product.imageUrl} alt={product.name} />
          <section className="flex w-max max-w-lg flex-col gap-6">
            <h1 className="text-4xl font-bold leading-tight">{product.name}</h1>
            <StarRating rating={product.rating} ratingsCount={product.ratingsCount} />
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
            <div className="flex gap-6">
              <QuantityInput count={quantity} setCount={setQuantity} />
              <Button onClick={() => {}}>Add to cart</Button>
            </div>
          </section>
        </>
      )}
    </section>
  );
}

export default Product;
