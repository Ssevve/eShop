import cx from 'classnames';
import formatPriceString from 'utils/formatPriceString';

interface PriceProps {
  price: number;
  isOld?: boolean;
  isNew?: boolean;
}

function Price({ price, isOld = false, isNew = false }: PriceProps) {
  return (
    <span
      className={cx(
        'font-bold',
        isNew && 'ml-2',
        isOld ? 'text-base text-gray-400 line-through' : 'text-xl'
      )}
    >
      {formatPriceString(price)}
    </span>
  );
}

export default Price;
