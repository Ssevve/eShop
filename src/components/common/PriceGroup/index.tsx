import Price from './components/Price';

interface PriceGroupProps {
  price: number;
  discountPrice: number;
}

function PriceGroup({ price, discountPrice }: PriceGroupProps) {
  const isDiscounted = discountPrice < price;

  return (
    <div className="flex items-center">
      <Price price={price} isOld={isDiscounted} />
      {isDiscounted && <Price price={discountPrice} isNew />}
    </div>
  );
}

export default PriceGroup;
