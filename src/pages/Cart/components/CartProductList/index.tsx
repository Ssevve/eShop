import CartProductType from 'types/CartProduct';
import CartProduct from '../CartProduct';

interface CartProductListProps {
  products: CartProductType[];
}

function CartProductList({ products }: CartProductListProps) {
  return (
    <ul>
      {products.map(({ quantity, product }) => (
        <li key={product._id}>
          <CartProduct initialQuantity={quantity} product={product} />
        </li>
      ))}
    </ul>
  );
}

export default CartProductList;
