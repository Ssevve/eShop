import { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import { FiChevronDown } from 'react-icons/fi';
import SortValue from 'types/SortValue';

export interface SelectOption {
  label: string;
  value: SortValue;
}

interface SelectProps {
  options: SelectOption[];
  onChange: (option: SelectOption) => void;
}

function Select({ options, onChange }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[1]);
  const selectMenuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (selectMenuRef.current) {
      selectMenuRef.current.scrollIntoView(false);
    }
  }, [isOpen]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleChange = (option: SelectOption) => {
    onChange(option);
    setSelectedOption(option);
    handleClose();
  };

  return (
    <div className="w-max" onMouseLeave={handleClose}>
      <button
        type="button"
        className="flex cursor-pointer items-center justify-between gap-3 rounded-sm border p-3 text-left"
        onClick={handleOpen}
      >
        {selectedOption.label}
        <FiChevronDown size={20} />
      </button>
      {isOpen && (
        <ul
          ref={selectMenuRef}
          className="rounded-sm border border-t-0 bg-white"
        >
          {options.map(
            (option) =>
              isOpen && (
                <li key={option.value}>
                  <button
                    className={cx(
                      'w-full p-3 text-left hover:bg-green-500 hover:text-white',
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
      )}
    </div>
  );
}

export default Select;