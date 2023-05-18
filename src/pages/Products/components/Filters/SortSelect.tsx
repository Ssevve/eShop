import { useRef, useState } from 'react';
import cx from 'classnames';
import { FiChevronDown } from 'react-icons/fi';
import SelectOption from 'types/SelectOption';

interface SelectDefaultProps {
  initialValue?: SelectOption;
}

interface SelectProps extends SelectDefaultProps {
  options: SelectOption[];
  label: string;
  onChange: (option: SelectOption) => void;
}

const defaultProps: SelectDefaultProps = {
  initialValue: undefined,
};

function SortSelect({ options, initialValue, label, onChange }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialValue);
  const selectMenuRef = useRef<HTMLUListElement>(null);

  const handleOpen = () => {
    setIsOpen(true);
    if (selectMenuRef.current) {
      selectMenuRef.current.scrollIntoView({
        block: 'nearest',
      });
    }
  };
  const handleClose = () => setIsOpen(false);
  const handleChange = (option: SelectOption) => {
    onChange(option);
    setSelectedOption(option);
    handleClose();
  };

  return (
    <div className="relative w-max" onMouseLeave={handleClose}>
      <button
        aria-label={label}
        type="button"
        className="flex cursor-pointer items-center justify-between gap-3 rounded-sm border p-3 text-left"
        onClick={handleOpen}
      >
        {selectedOption ? selectedOption.label : label}
        <FiChevronDown size={20} />
      </button>
      {isOpen && (
        <ul
          ref={selectMenuRef}
          className="absolute w-full rounded-sm border border-t-0 bg-white"
        >
          {options.map(
            (option) =>
              isOpen && (
                <li key={option.value}>
                  <button
                    className={cx(
                      'w-full p-3 text-left hover:bg-primary-green hover:text-white',
                      option === selectedOption && 'bg-primary-green text-white'
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

SortSelect.defaultProps = defaultProps;

export default SortSelect;
