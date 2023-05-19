import cx from 'classnames';

interface PriceDefaultProps {
  isOld?: boolean;
  isNew?: boolean;
}

interface PriceProps extends PriceDefaultProps {
  price: number;
}

const defaultProps: PriceDefaultProps = {
  isOld: false,
  isNew: false,
};

const formatPriceString = (price: number) => `$${price.toFixed(2)}`;

function Price({ price, isOld, isNew }: PriceProps) {
  return (
    <span
      className={cx(
        'font-bold',
        isNew && 'ml-2 text-xl text-red-700',
        isOld ? 'text-base line-through' : 'text-xl'
      )}
    >
      {formatPriceString(price)}
    </span>
  );
}

Price.defaultProps = defaultProps;

export default Price;
