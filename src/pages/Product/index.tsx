import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from 'services/api';
import PriceGroup from 'components/common/PriceGroup';
import StarRating from 'components/common/StarRating/StarRating';
import Counter from './components/Counter';

function Product() {
  const { id } = useParams();
  const { data: product, isFetching, error } = useGetProductByIdQuery(id);
  return (
    <section className="container m-auto flex flex-wrap items-center justify-center gap-8">
      {product && (
        <>
          <img src={product.imageUrl} alt={product?.name} />
          <section className="flex w-full max-w-lg flex-col gap-6">
            <h1 className="text-4xl font-bold leading-tight">
              {product?.name}
            </h1>
            <StarRating
              rating={product?.rating}
              ratingsCount={product?.ratingsCount}
            />
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
            <PriceGroup
              price={product.price}
              discountPrice={product.discountPrice}
            />
            <Counter />
          </section>
        </>
      )}
    </section>
  );
}

export default Product;
