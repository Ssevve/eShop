import { useAppSelector } from '@/app/hooks';
import { selectCartProducts } from '@/features/cart/cartSlice';
import useWindowWidth from '@/hooks/useWindowWidth';
import useBreakpointValue from '@/hooks/useBreakpointValue';
import List from '@/components/common/List';
import { CartProduct } from './CartProduct';

function CartProductList() {
  const products = useAppSelector(selectCartProducts);
  const windowWidth = useWindowWidth();
  const smallBreakpoint = useBreakpointValue('xs');
  const isSmallWindowSize = windowWidth < smallBreakpoint;

  return (
    <List
      items={products}
      getKey={({ product }) => product._id}
      renderItem={({ quantity, product }) => (
        <CartProduct
          product={product}
          initialQuantity={quantity}
          compactInput={isSmallWindowSize}
        />
      )}
      className="divide-y"
      emptyItemsMessage="Your cart is empty!"
      emptyItemsMessageClass="w-full py-12 text-center text-5xl font-bold text-gray-200 md:text-6xl"
    />
  );
}

export default CartProductList;
