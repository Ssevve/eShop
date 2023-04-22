import { useState } from 'react';
import cx from 'classnames';
import { FiChevronDown } from 'react-icons/fi';
import SortValue from 'types/SortValue';

export interface SelectOption<V = any> {
  label: string;
  value: V;
}

interface SelectProps {
  options: SelectOption[];
  onChange: (option: SelectOption) => void;
}

function Select({ options, onChange }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[1]);

  const handleChange = (option: SelectOption<SortValue>) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false);
  };

  const handleOpen = () => setIsOpen((prev) => !prev);

  // TODO: Auto scroll to the most-bottom option on open

  return (
    <div className="relative w-max" onMouseLeave={() => setIsOpen(false)}>
      <button
        type="button"
        className="relative flex cursor-pointer items-center justify-between gap-3 rounded-sm border p-3 text-left"
        onClick={handleOpen}
      >
        {selectedOption.label}
        <FiChevronDown size={20} />
      </button>
      <ul className="absolute top-full left-0 rounded-sm border bg-white">
        {isOpen &&
          options.map(
            (option) =>
              isOpen && (
                <li key={option.value}>
                  <button
                    className={cx(
                      'w-full p-3 hover:bg-green-500 hover:text-white',
                      option === selectedOption && 'bg-green-500 text-white'
                    )}
                    type="button"
                    onClick={() => handleChange(option)}
                  >
                    {option.label}
                  </button>
                </li>
              )
          )}
      </ul>
    </div>
  );
}

export default Select;
