import cx from 'classnames';
import { FiPercent } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  selectCurrentCategory,
  setCurrentCategory,
  showBestDeals,
} from 'features/filters/filtersSlice';

function Categories() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.filters.categories);
  const currentCategory = useAppSelector(selectCurrentCategory);
  return (
    <>
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
      <h3 className="px-4 text-xl font-bold">Categories</h3>
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
    </>
  );
}

export default Categories;
