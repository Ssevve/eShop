import { useAppSelector } from '@/app/hooks';
import { List } from '@/components/common/List';
import useBreakpointValue from '@/hooks/useBreakpointValue';
import useWindowWidth from '@/hooks/useWindowWidth';
import { CartProduct } from './CartProduct';

export function CartProductList() {
  const windowWidth = useWindowWidth();
  const smallBreakpoint = useBreakpointValue('xs');
  const isSmallWindowSize = windowWidth < smallBreakpoint;

  return;
  // <List
  //   items={products}
  //   getKey={({ product }) => product._id}
  //   renderItem={({ amount, product }) => (
  //     <CartProduct product={product} initialAmount={amount} compactInput={isSmallWindowSize} />
  //   )}
  //   className="divide-y"
  //   emptyItemsMessage="Your cart is empty!"
  //   emptyItemsMessageClass="w-full py-12 text-center text-5xl font-bold text-gray-200 md:text-6xl"
  // />
}
