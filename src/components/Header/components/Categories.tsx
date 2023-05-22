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
  const categories = useAppSelector((state) => state.categories.categories);
  const shouldRenderBackdrop = shouldShowCategories && isMobile;

  return (
    <>
      {shouldRenderBackdrop && (
        <div className="absolute left-0 top-0 h-screen w-screen bg-black/60" />
      )}
      <section
        className={cx(
          shouldShowCategories ? 'translate-x-0' : '-translate-x-full',
          'absolute top-0 h-screen w-full max-w-lg bg-white transition-transform first-line:shadow-md md:static md:top-full md:h-max md:w-full md:max-w-full md:transition-none'
        )}
      >
        {isMobile && (
          <header className="flex items-center gap-4 bg-gray-300 p-3 text-2xl font-bold">
            <button
              type="button"
              className="rounded-full p-3 hover:bg-gray-400"
              onClick={closeCategories}
            >
              <TfiClose size={20} />
            </button>
            <h2>Categories</h2>
          </header>
        )}
        <div className="md:bg-gray-200">
          <ul
            className={cx(
              'align-center container mx-auto flex-wrap justify-between bg-white md:flex md:flex-nowrap md:bg-gray-200'
            )}
          >
            <li className="w-full text-left hover:bg-gray-400" key="Best Deals">
              <CategoryLink
                onClick={isMobile ? closeCategories : () => {}}
                category={null}
                label="All products"
              />
            </li>
            {categories.map((category) => (
              <li
                className="w-full text-left hover:bg-gray-400 hover:text-white"
                key={category}
              >
                <CategoryLink
                  onClick={isMobile ? closeCategories : () => {}}
                  category={category}
                  label={category}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default Categories;
