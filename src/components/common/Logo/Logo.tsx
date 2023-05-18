import { FiShoppingBag } from 'react-icons/fi';

function Logo() {
  return (
    <div className="flex items-center gap-2 text-lg font-bold">
      <FiShoppingBag
        role="img"
        title="eShop"
        aria-hidden="true"
        className="text-primary-green"
        size={32}
      />
      <span role="note" aria-label="eShop">
        eShop
      </span>
    </div>
  );
}

export default Logo;
