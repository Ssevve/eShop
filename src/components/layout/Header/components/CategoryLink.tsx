import queryString from 'query-string';
import cx from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Category } from 'features/filters/filtersSlice';

interface CategoryLinkProps {
  category: Category;
  onClick: () => void;
}

function CategoryLink({ category, onClick }: CategoryLinkProps) {
  const location = useLocation();
  const searchParams = queryString.parse(location.search);
  const currentLocationCategory = searchParams.category;
  searchParams.category = category;
  searchParams.page = '1';

  return (
    <Link
      onClick={onClick}
      className={cx(
        currentLocationCategory === category && 'bg-green-500 text-white',
        'flex h-full items-center p-3 text-lg md:justify-center md:text-center md:text-sm'
      )}
      to={{
        pathname: '/products',
        search: queryString.stringify(searchParams),
      }}
    >
      <span>{category}</span>
    </Link>
  );
}

export default CategoryLink;
