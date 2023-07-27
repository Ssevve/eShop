import { memo } from 'react';
import { Price } from './Price';

interface PriceGroupProps {
  price: number;
  discountPrice: number;
}

export const PriceGroup = memo(({ price, discountPrice }: PriceGroupProps) => {
  const isDiscounted = discountPrice < price;

  return (
    <div className="flex items-center">
      <Price price={price} isOld={isDiscounted} />
      {isDiscounted && <Price price={discountPrice} />}
    </div>
  );
});
