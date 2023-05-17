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
        isActive && 'bg-green-500 text-white',
        'flex h-full items-center p-3 text-lg md:justify-center md:text-center md:text-sm'
      )}
      to={category ? `/products?category=${category}` : '/products'}
    >
      {label}
    </Link>
  );
}

export default CategoryLink;
