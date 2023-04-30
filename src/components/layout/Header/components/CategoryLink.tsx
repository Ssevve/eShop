import queryString from 'query-string';
import cx from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Category } from 'features/filters/filtersSlice';

interface CategoryLinkProps {
  category: Category;
}

function CategoryLink({ category }: CategoryLinkProps) {
  const location = useLocation();
  const searchParams = queryString.parse(location.search);
  const selectedCategory = searchParams.category;
  const newSearchParams = queryString.stringify({
    page: '1',
    category,
  });

  return (
    <Link
      className={cx(
        category === selectedCategory && 'bg-green-500 text-white',
        'flex h-full items-center justify-center p-4 text-center hover:bg-green-500 hover:text-white md:p-2 md:text-sm lg:p-3 lg:text-base'
      )}
      to={{ pathname: '/products', search: newSearchParams }}
    >
      <span>{category}</span>
    </Link>
  );
}

export default CategoryLink;
