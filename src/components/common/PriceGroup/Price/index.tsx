import formatPriceString from 'utils/formatPriceString';

interface PriceProps {
  price: number;
  isOld?: boolean;
}

function Price({ price, isOld }: PriceProps) {
  return (
    <span
      className={`font-bold ${isOld ? 'mr-2 text-base text-gray-400 line-through' : 'text-xl'}`}
    >
      {formatPriceString(price)}
    </span>
  );
}

export default Price;
