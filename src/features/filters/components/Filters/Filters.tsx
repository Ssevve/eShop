import cx from 'classnames';
import { FiPercent } from 'react-icons/fi';
import ReactSelect, { SingleValue } from 'react-select';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  selectCurrentCategory,
  setCurrentCategory,
  showBestDeals,
  setSortBy,
  selectSortBy,
} from 'features/filters/filtersSlice';
import {
  selectSortOptions,
  SortValue,
  SelectSortOption,
} from 'features/filters/sortOptions';
import { useEffect } from 'react';

function Filters() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.filters.categories);
  const currentCategory = useAppSelector(selectCurrentCategory);
  // const sortBy = useAppSelector(selectSortBy);

  // const getSelectedSortOption = (val: SortValue) =>
  // selectSortOptions.find((option) => option.value === val);

  const handleSortChange = (option: SelectSortOption) =>
    dispatch(setSortBy(option?.value));

  // TODO: Fix bg color from default blue to green-500 if isSelected
  const reactSelectClassNames = {
    option: (state: { isSelected: boolean }) =>
      cx(
        'hover:bg-green-500 hover:text-white active:bg-green-500',
        state.isSelected && 'bg-green-500'
      ),
  };

  return (
    <div className="flex w-1/3 min-w-fit flex-col gap-4 border leading-none">
      <button
        className={cx(
          'flex w-full items-center gap-2 p-4 text-left',
          !currentCategory && 'bg-green-500 text-white'
        )}
        disabled={!currentCategory}
        type="button"
        onClick={() => dispatch(showBestDeals())}
      >
        <FiPercent size={20} />
        Best Deals
      </button>
      <h3 className="px-4 text-xl font-bold">Categories:</h3>
      <ul>
        {categories.map((category) => (
          <li className="flex" key={category}>
            <button
              className={cx(
                'w-full items-center justify-center p-4 text-left',
                currentCategory === category && 'bg-green-500 text-white'
              )}
              disabled={currentCategory === category}
              type="button"
              onClick={() => dispatch(setCurrentCategory(category))}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
      <h3 className="px-4 text-xl font-bold">Sort by</h3>
      <ReactSelect
        className="px-4"
        classNames={reactSelectClassNames}
        // value={getSelectedSortOption(sortBy)}
        options={selectSortOptions}
        onChange={(option: SingleValue<SelectSortOption>) =>
          handleSortChange(option)
        }
      />
    </div>
  );
}

export default Filters;
