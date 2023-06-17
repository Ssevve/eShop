import cx from 'classnames';
import { FiPlus, FiMinus } from 'react-icons/fi';

interface DefaultQuantityInputProps {
  minCount?: number;
  maxCount?: number;
}

interface QuantityInputProps extends DefaultQuantityInputProps {
  count: number;
  setCount: (quantity: number) => void;
}

function QuantityInput({ count, setCount, minCount = 1, maxCount = 99 }: QuantityInputProps) {
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

  return (
    <div className="flex w-min border py-2">
      <button
        aria-label="Decrease quantity"
        className={cx('items-center border-r px-2', isMinimumQuantity && 'text-gray-400')}
        type="button"
        onClick={handleDecrement}
        disabled={isMinimumQuantity}
      >
        <FiMinus />
      </button>
      <input
        className="w-10 text-center"
        type="number"
        value={count}
        onChange={handleChange}
        min={minCount}
        max={maxCount}
      />
      <button
        aria-label="Increase quantity"
        className={cx('items-center border-l px-2', isMaximumQuantity && 'text-gray-400')}
        type="button"
        onClick={handleIncrement}
        disabled={isMaximumQuantity}
      >
        <FiPlus />
      </button>
    </div>
  );
}

export default QuantityInput;
