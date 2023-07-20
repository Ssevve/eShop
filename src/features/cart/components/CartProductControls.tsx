import { useAppDispatch } from '@/app/hooks';
import Button from '@/components/common/Button';
import QuantityInput from '@/components/common/QuantityInput';
import { useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { removeCartProduct, setCartProductQuantity } from '../cartSlice';

interface CartProductControls {
  compactInput?: boolean;
  productId: string;
  initialQuantity: number;
}

export function CartProductControls({
  compactInput,
  productId,
  initialQuantity,
}: CartProductControls) {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleQuantityChange = (quantity: number) => {
    setQuantity(quantity);
    dispatch(setCartProductQuantity({ productId, quantity }));
  };

  return (
    <div className="col-start-2 flex items-end gap-3 sm:col-start-3 sm:justify-self-end">
      <QuantityInput compact={compactInput} count={quantity} setCount={handleQuantityChange} />
      <Button
        evenPadding
        variant="neutral"
        textSize="lg"
        onClick={() => dispatch(removeCartProduct(productId))}
        aria-label="Remove"
      >
        <FiTrash />
      </Button>
    </div>
  );
}

export default CartProductControls;
