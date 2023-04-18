import cx from 'classnames';
import { FiPercent } from 'react-icons/fi';
import ReactSelect from 'react-select';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  selectCurrentCategory,
  setCurrentCategory,
  showBestDeals,
  setSortBy,
} from 'features/filters/filtersSlice';
import SortOptions, { SortOption } from 'features/filters/sortOptions';

const sortSelectOptions = [
  {
    label: 'Name (A-Z)',
    value: SortOptions.NAME_ASCENDING,
  },
  {
    label: 'Name (Z-A)',
    value: SortOptions.NAME_DESCENDING,
  },
  {
    label: 'Price asc.',
    value: SortOptions.PRICE_ASCENDING,
  },
  {
    label: 'Price desc.',
    value: SortOptions.PRICE_DESCENDING,
  },
];

type SortSelectOption = { label: string; value: SortOption } | null;

function Filters() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.filters.categories);
  const currentCategory = useAppSelector(selectCurrentCategory);

  const handleSortChange = (option: SortSelectOption) => {
    if (option) {
      dispatch(setSortBy(option.value));
    }
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
        className="mx-4"
        options={sortSelectOptions}
        onChange={(option: SortSelectOption) => handleSortChange(option)}
      />
    </div>
  );
}

export default Filters;
