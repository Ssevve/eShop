import cx from 'classnames';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import Category from 'types/Category';

interface CategoryLinkProps {
  category: Category;
  label: React.ReactNode;
  onClick: () => void;
}

function CategoryLink({ category, label, onClick }: CategoryLinkProps) {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get('category');
  const isActive = category
    ? activeCategory === category
    : location.pathname === '/products' && !activeCategory;

  return (
    <Link
      onClick={onClick}
      className={cx(
        isActive &&
          'bg-primary-green text-white md:border-b-primary-green md:bg-white md:text-black',
        'flex h-full items-center border-white p-3 text-lg uppercase hover:border-b-primary-green hover:bg-gray-400 hover:text-white md:justify-center md:border-b-4 md:text-center md:text-xs md:font-bold md:hover:bg-white md:hover:text-black'
      )}
      to={category ? `/products?category=${category}` : '/products'}
    >
      {label}
    </Link>
  );
}

export default CategoryLink;
