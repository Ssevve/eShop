import { Link } from 'react-router-dom';

interface CategoryLinkProps {
  category: string | null;
  label: React.ReactNode;
  onClick?: () => void;
}

function CategoryLink({ category, label, onClick }: CategoryLinkProps) {
  return (
    <Link
      className="block h-full min-w-max"
      onClick={onClick}
      to={category ? `/products?category=${category}` : '/products'}
    >
      {label}
    </Link>
  );
}

export default CategoryLink;
