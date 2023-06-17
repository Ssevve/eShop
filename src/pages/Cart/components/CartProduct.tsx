import { useAppDispatch } from 'app/hooks';
import Button from 'components/common/Button';
import { removeCartProduct, setCartProductQuantity } from 'features/cart/cartSlice';
import QuantityInput from 'pages/Product/components/QuantityInput';
import { useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Product from 'types/Product';

interface CartProductProps {
  initialQuantity: number;
  product: Product;
}

function CartProduct({ initialQuantity, product }: CartProductProps) {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleQuantityChange = (quantity: number) => {
    setQuantity(quantity);
    dispatch(setCartProductQuantity({ productId: product._id, quantity }));
  };

  const handleRemove = () => dispatch(removeCartProduct(product._id));

  return (
    <div className="flex h-32 items-center justify-between border-b py-3">
      <Link
        className="flex h-full items-center gap-3 hover:underline"
        to={`/products/${product._id}`}
      >
        <img className="h-full" src={product.imageUrl} alt={product.name} />
        <p>{product.name}</p>
      </Link>
      <div className="flex gap-3">
        <QuantityInput count={quantity} setCount={handleQuantityChange} />
        <Button textSize="xl" onClick={handleRemove} ariaLabel="Remove product from cart">
          <FiTrash />
        </Button>
      </div>
    </div>
  );
}

export default CartProduct;
