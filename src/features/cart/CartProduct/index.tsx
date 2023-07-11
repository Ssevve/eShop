import { useAppDispatch } from 'app/hooks';
import Button from 'components/common/Button';
import PriceGroup from 'components/common/PriceGroup';
import { removeCartProduct, setCartProductQuantity } from 'features/cart/cartSlice';
import QuantityInput from 'components/common/QuantityInput';
import { useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Product } from 'app/services/products';

interface CartProductProps {
  initialQuantity: number;
  product: Product;
  compactInput: boolean;
}

function CartProduct({ initialQuantity, product, compactInput }: CartProductProps) {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleQuantityChange = (quantity: number) => {
    setQuantity(quantity);
    dispatch(setCartProductQuantity({ productId: product._id, quantity }));
  };

  const handleRemove = () => dispatch(removeCartProduct(product._id));
  return (
    <div className="grid grid-cols-2 place-items-center gap-3 border-b py-3 sm:grid-cols-3">
      <Link
        className="col-span-2 grid grid-cols-2 place-items-center gap-3 hover:underline sm:col-span-1 sm:justify-items-start"
        to={`/products/${product._id}`}
      >
        <img className="col-span-1 w-1/2" src={product.imageUrl} alt={product.name} />
        <span className="col-span-1">{product.name}</span>
      </Link>
      <section className="row-start-2 flex items-end sm:col-start-2 sm:row-start-1">
        <PriceGroup price={product.price} discountPrice={product.discountPrice} />
      </section>
      <div className="col-start-2 flex items-end gap-3 sm:col-start-3 sm:justify-self-end">
        <QuantityInput compact={compactInput} count={quantity} setCount={handleQuantityChange} />
        <Button
          evenPadding
          variant="neutral"
          textSize="lg"
          onClick={handleRemove}
          aria-label="Remove product from cart"
        >
          <FiTrash />
        </Button>
      </div>
    </div>
  );
}

export default CartProduct;
