import { List } from '@/components/common/List';
import useBreakpointValue from '@/hooks/useBreakpointValue';
import useWindowWidth from '@/hooks/useWindowWidth';
import { CartProduct } from './CartProduct';
import { CartProduct as CartProductType } from '../types';

interface CartProductListProps {
  products: CartProductType[] | undefined;
}

export function CartProductList({ products }: CartProductListProps) {
  const windowWidth = useWindowWidth();
  const smallBreakpoint = useBreakpointValue('xs');
  const isSmallWindowSize = windowWidth < smallBreakpoint;

  return (
    <List
      items={products}
      getKey={({ product }) => product._id}
      renderItem={(product) => <CartProduct product={product} compactInput={isSmallWindowSize} />}
      className="divide-y"
      emptyItemsMessage="Your cart is empty!"
      emptyItemsMessageClass="w-full py-12 text-center text-5xl font-bold text-gray-200 md:text-6xl"
    />
  );
}
