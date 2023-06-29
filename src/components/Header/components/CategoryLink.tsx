import { Link } from 'react-router-dom';

interface CategoryLinkProps {
  category: string | null;
  label: React.ReactNode;
  onClick?: () => void;
}

function CategoryLink({ category, label, onClick }: CategoryLinkProps) {
  return (
    <Link
      className="block h-full w-full min-w-max p-3"
      onClick={onClick}
      to={category ? `/products?category=${category}` : '/products'}
    >
      {label}
    </Link>
  );
}

export default CategoryLink;
