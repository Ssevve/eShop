import { TfiClose } from 'react-icons/tfi';

interface CategoryListHeaderProps {
  closeCategories: () => void;
}

function CategoryListHeader({ closeCategories }: CategoryListHeaderProps) {
  return (
    <header className="flex items-center gap-4 bg-gray-300 p-3 text-2xl font-bold">
      <button
        aria-label="Close categories"
        type="button"
        className="rounded-full p-3 hover:bg-gray-400"
        onClick={closeCategories}
      >
        <TfiClose size={20} />
      </button>
      <h2>Categories</h2>
    </header>
  );
}

export default CategoryListHeader;
