import Price from './components/Price';

interface PriceGroupProps {
  price: number;
  discountPrice: number;
}

function PriceGroup({ price, discountPrice }: PriceGroupProps) {
  const isDiscounted = discountPrice < price;

  return (
    <section>
      <Price price={price} isOld={isDiscounted} />
      {isDiscounted && <Price price={discountPrice} isNew />}
    </section>
  );
}

export default PriceGroup;
