import { FiPlus, FiMinus } from 'react-icons/fi';

interface QuantityInputProps {
  count: number;
  setCount: (val: number | ((prev: number) => number)) => void;
}

const MAX_QUANTITY = 99;

function QuantityInput({ count, setCount }: QuantityInputProps) {
  const handleDecrement = () => {
    setCount((prev: number) => {
      const newCount = prev - 1;
      return newCount < 1 ? 1 : newCount;
    });
  };
  const handleIncrement = () => setCount((prev) => prev + 1);
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newCount = Number(e.currentTarget.value);
    if (newCount < MAX_QUANTITY) {
      setCount(newCount);
    } else {
      setCount(MAX_QUANTITY);
    }
  };

  return (
    <div className="flex w-min border py-2">
      <button
        aria-label="Decrease quantity"
        className="items-center border-r px-2"
        type="button"
        onClick={handleDecrement}
        disabled={count === 1}
      >
        <FiMinus />
      </button>
      <input
        className="w-10 text-center"
        type="number"
        value={count}
        onChange={handleChange}
        min="1"
        max="99"
      />
      <button
        aria-label="Increase quantity"
        className="items-center border-l px-2"
        type="button"
        onClick={handleIncrement}
        disabled={count === MAX_QUANTITY}
      >
        <FiPlus />
      </button>
    </div>
  );
}

export default QuantityInput;
