import { formatPrice } from '@/utils/format';

interface PriceProps {
  price: number;
  isOld?: boolean;
}

function Price({ price, isOld }: PriceProps) {
  return (
    <span
      className={`font-bold ${isOld ? 'mr-2 text-base text-gray-400 line-through' : 'text-xl'}`}
    >
      {formatPrice(price)}
    </span>
  );
}

export default Price;
