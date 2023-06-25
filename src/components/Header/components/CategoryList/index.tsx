import cx from 'classnames';
import CategoryLink from '../CategoryLink';
import categories from 'lib/categories';
import CategoryListHeader from '../CategoryListHeader';

interface CategoryListProps {
  closeCategories: () => void;
  shouldShowCategories: boolean;
  isMobile: boolean;
}

function CategoryList({ closeCategories, shouldShowCategories, isMobile }: CategoryListProps) {
  const shouldRenderBackdrop = shouldShowCategories && isMobile;

  return (
    <>
      {shouldRenderBackdrop && (
        <div className="absolute left-0 top-0 h-screen w-screen bg-black/60" />
      )}
      <section
        aria-hidden={!shouldShowCategories}
        className={cx(
          shouldShowCategories ? 'translate-x-0' : '-translate-x-full',
          'absolute top-0 h-screen w-full max-w-lg bg-white transition-transform first-line:shadow-md md:static md:top-full md:h-max md:w-full md:max-w-full md:transition-none'
        )}
      >
        {isMobile && <CategoryListHeader closeCategories={closeCategories} />}
        <div className="md:px-3">
          <ul
            className={cx(
              'align-center mx-auto flex-wrap justify-between bg-white md:flex md:flex-nowrap'
            )}
          >
            <li className="w-full text-left">
              <CategoryLink
                onClick={isMobile ? closeCategories : () => {}}
                category={null}
                label="All products"
              />
            </li>
            {categories.map((category) => (
              <li className="w-full text-left" key={category}>
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

export default CategoryList;
