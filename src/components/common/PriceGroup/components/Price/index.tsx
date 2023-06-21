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
        isNew && 'ml-2 text-red-700',
        isOld ? 'text-base line-through' : 'text-xl'
      )}
    >
      {formatPriceString(price)}
    </span>
  );
}

export default Price;
