import queryString from 'query-string';
import cx from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Category } from 'features/filters/filtersSlice';
import { useEffect } from 'react';

interface CategoryLinkProps {
  category: Category;
}

// TODO: Fix active state for links, make them a button instead maybe?
function CategoryLink({ category }: CategoryLinkProps) {
  const searchParams = queryString.parse(location.search);
  // const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.category;
  // const selectedCategory = searchParams.get('category');

  // searchParams.set('category', category || '');

  searchParams.category = category;
  console.log(searchParams);

  return (
    <Link
      className={
        'text-sm flex items-center justify-center p-3 h-full text-center'
      }
      to={{ pathname: '/products', search: queryString.stringify(searchParams) }}
    >
      <span>{category}</span>
    </Link>
  );
}

export default CategoryLink;
