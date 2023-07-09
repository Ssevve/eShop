import cx from 'classnames';
import { productConstraints } from 'lib/constants';
import { FiPlus, FiMinus } from 'react-icons/fi';

interface QuantityInputProps {
  count: number;
  setCount: (quantity: number) => void;
  minCount?: number;
  maxCount?: number;
  compact?: boolean;
}

function QuantityInput({
  count,
  setCount,
  minCount = productConstraints.quantity.min,
  maxCount = productConstraints.quantity.max,
  compact = false,
}: QuantityInputProps) {
  const isMinimumQuantity = count <= minCount;
  const isMaximumQuantity = count >= maxCount;

  const handleDecrement = () => {
    const newCount = count - 1;
    if (newCount >= minCount) setCount(newCount);
  };

  const handleIncrement = () => {
    const newCount = count + 1;
    if (newCount <= maxCount) setCount(newCount);
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newCount = e.currentTarget.valueAsNumber;
    if (newCount > maxCount) setCount(maxCount);
    else if (newCount < minCount) setCount(minCount);
    else setCount(newCount);
  };

  const handleBlur = () => {
    if (!count) setCount(productConstraints.quantity.min);
  };

  return (
    <div className="flex w-min border py-2">
      {!compact && (
        <button
          aria-label="Decrease quantity"
          className={cx('items-center border-r px-2', isMinimumQuantity && 'text-gray-400')}
          type="button"
          onClick={handleDecrement}
          disabled={isMinimumQuantity}
        >
          <FiMinus />
        </button>
      )}
      <input
        className="w-10 text-center"
        type="number"
        value={count}
        onChange={handleChange}
        onBlur={handleBlur}
        min={minCount}
        max={maxCount}
      />
      {!compact && (
        <button
          aria-label="Increase quantity"
          className={cx('items-center border-l px-2', isMaximumQuantity && 'text-gray-400')}
          type="button"
          onClick={handleIncrement}
          disabled={isMaximumQuantity}
        >
          <FiPlus />
        </button>
      )}
    </div>
  );
}

export default QuantityInput;
