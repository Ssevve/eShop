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
  const currentLocationCategory = searchParams.category;
  searchParams.category = category;
  searchParams.page = '1';

  return (
    <Link
      className={cx(
        currentLocationCategory === category && 'bg-green-500 text-white',
        'text-sm flex items-center justify-center p-3 h-full text-center')
      }
      to={{ pathname: '/products', search: queryString.stringify(searchParams)}}
    >
      <span>{category}</span>
    </Link>
  );

}

export default CategoryLink;
