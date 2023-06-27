import cx from 'classnames';
import formatPriceString from 'utils/formatPriceString';

interface PriceDefaultProps {
  isOld?: boolean;
  isNew?: boolean;
}

interface PriceProps extends PriceDefaultProps {
  price: number;
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
