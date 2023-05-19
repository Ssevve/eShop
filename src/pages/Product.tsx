import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from 'services/api';
import PriceGroup from 'components/common/PriceGroup';

function Product() {
  const { id } = useParams();
  const { data: product, isFetching, error } = useGetProductByIdQuery(id);

  return (
    <section className="container mx-auto flex justify-center gap-8">
      {product && (
        <>
          <img src={product.imageUrl} alt={product?.name} />
          <section className="">
            <h1 className="text-5xl font-bold">{product?.name}</h1>
            <PriceGroup
              price={product.price}
              discountPrice={product.discountPrice}
            />
          </section>
        </>
      )}
    </section>
  );
}

export default Product;
