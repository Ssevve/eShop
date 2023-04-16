import cx from 'classnames';
import { FiPercent } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  selectCurrentCategory,
  setCurrentCategory,
  showBestDeals,
} from 'features/filters/filtersSlice';

function Filters() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.filters.categories);
  const currentCategory = useAppSelector(selectCurrentCategory);

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
    </div>
  );
}

export default Filters;
