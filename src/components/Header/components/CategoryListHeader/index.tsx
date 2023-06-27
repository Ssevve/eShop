import { TfiClose } from 'react-icons/tfi';

interface CategoryListHeaderProps {
  closeCategories: () => void;
}

function CategoryListHeader({ closeCategories }: CategoryListHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-3 p-3">
      <h2 className="font-semibold uppercase text-gray-400">Categories</h2>
      <button
        aria-label="Close categories"
        type="button"
        className="rounded-sm p-1.5 text-gray-400 hover:bg-gray-200 hover:text-gray-800"
        onClick={closeCategories}
      >
        <TfiClose size={16} strokeWidth={2} />
      </button>
    </header>
  );
}

export default CategoryListHeader;
