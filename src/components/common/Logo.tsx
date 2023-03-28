import { ShoppingBag } from 'react-feather';

function Logo() {
  return (
    <div className="flex items-center gap-2 text-lg font-bold">
      <ShoppingBag aria-hidden="true" className="text-green-600" size={32} />
      <span>eShop</span>
    </div>
  );
}

export default Logo;
