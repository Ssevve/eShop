import CategoryLink from '../CategoryLink';
import categories from 'features/categories/categories';

interface CategoryListProps {
  toggleClose: () => void;
}

function CategoryList({ toggleClose }: CategoryListProps) {
  return (
    <ul className="ml-3 grid gap-3 space-y-1.5 overflow-hidden bg-white py-1.5 lg:ml-0 lg:grid-cols-2 lg:space-y-0 lg:rounded-sm lg:p-6">
      <li className="ml-1.5 rounded-sm p-1.5 hover:bg-gray-200 lg:m-0 lg:p-0 lg:hover:bg-white lg:hover:underline">
        <CategoryLink onClick={toggleClose} category={null} label="All products" />
      </li>
      {categories.map((category) => (
        <li
          className="ml-1.5 rounded-sm p-1.5 hover:bg-gray-200 lg:m-0 lg:p-0 lg:hover:bg-white lg:hover:underline"
          key={category}
        >
          <CategoryLink onClick={toggleClose} category={category} label={category} />
        </li>
      ))}
    </ul>
  );
}

export default CategoryList;
