import cx from 'classnames';
import { TfiClose } from 'react-icons/tfi';
import { useAppSelector } from 'app/hooks';
import CategoryLink from './CategoryLink';

interface CategoriesProps {
  closeCategories: () => void;
  shouldShowCategories: boolean;
  isMobile: boolean;
}

function Categories({
  closeCategories,
  shouldShowCategories,
  isMobile,
}: CategoriesProps) {
  const categories = useAppSelector((state) => state.filters.categories);
  const shouldRenderBackdrop = shouldShowCategories && isMobile;

  return (
    <>
      <section
        className={cx(
          shouldShowCategories ? 'translate-x-0' : '-translate-x-full',
          'absolute top-0 z-10 h-screen w-full max-w-lg bg-white shadow-md transition-transform md:static md:top-full md:h-max md:w-full md:max-w-full md:transition-none'
        )}
      >
        {isMobile && (
          <header className="flex items-center gap-4 bg-slate-200 p-3 text-2xl font-bold">
            <button
              type="button"
              className="rounded-full p-3 hover:bg-slate-300"
              onClick={closeCategories}
            >
              <TfiClose size={20} />
            </button>
            <h2>Categories</h2>
          </header>
        )}
        <ul
          className={cx(
            'align-center flex-wrap justify-between bg-white md:flex md:flex-nowrap md:bg-slate-200'
          )}
        >
          <li className="w-full text-left hover:bg-slate-300" key="Best Deals">
            <CategoryLink
              onClick={isMobile ? closeCategories : () => {}}
              category={null}
              label="Best Deals"
            />
          </li>
          {categories.map((category) => (
            <li className="w-full text-left hover:bg-slate-300" key={category}>
              <CategoryLink
                onClick={isMobile ? closeCategories : () => {}}
                category={category}
              />
            </li>
          ))}
        </ul>
      </section>
      {shouldRenderBackdrop && (
        <div className="absolute left-0 top-0 h-screen w-screen bg-black/60" />
      )}
    </>
  );
}

export default Categories;
