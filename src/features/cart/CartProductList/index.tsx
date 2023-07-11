import { CartProduct as CartProductType } from 'features/cart/cartSlice';
import CartProduct from '../CartProduct';
import useWindowWidth from 'hooks/useWindowWidth';
import useBreakpointValue from 'hooks/useBreakpointValue';

interface CartProductListProps {
  products: CartProductType[];
}

function CartProductList({ products }: CartProductListProps) {
  const windowWidth = useWindowWidth();
  const smallBreakpoint = useBreakpointValue('sm');
  const isSmallWindowSize = windowWidth < smallBreakpoint;

  return (
    <ul>
      {products.map(({ quantity, product }) => (
        <li key={product._id}>
          <CartProduct
            initialQuantity={quantity}
            product={product}
            compactInput={isSmallWindowSize}
          />
        </li>
      ))}
    </ul>
  );
}

export default CartProductList;
