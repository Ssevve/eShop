import { List } from '@/components/common/List';
import { CartProduct as CartProductType } from '../types';
import { CartProduct } from './CartProduct';

interface CartProductListProps {
  products: CartProductType[] | undefined;
}

export function CartProductList({ products }: CartProductListProps) {
  return (
    <List
      items={products}
      getKey={({ product }) => product._id}
      renderItem={(product) => <CartProduct productId={product.product._id} />}
      className="divide-y"
      emptyItemsMessage="Your cart is empty!"
      emptyItemsMessageClass="w-full py-12 text-center text-5xl font-bold text-gray-200 md:text-6xl"
    />
  );
}
