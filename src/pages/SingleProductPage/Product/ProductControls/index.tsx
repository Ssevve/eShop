import { useAppDispatch } from 'app/hooks';
import { Product } from 'app/services/products';
import Button from 'components/common/Button';
import QuantityInput from 'components/common/QuantityInput';
import { addCartProduct } from 'features/cart/cartSlice';
import { productConstraints } from 'lib/constants';
import { useState } from 'react';

interface ProductControlsProps {
  product: Product;
}

function ProductControls({ product }: ProductControlsProps) {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(productConstraints.quantity.min);

  const addToCart = () => dispatch(addCartProduct({ quantity, product }));

  return (
    <div className="flex gap-6 xs:w-max">
      <QuantityInput count={quantity} setCount={setQuantity} />
      <Button onClick={addToCart}>Add to cart</Button>
    </div>
  );
}

export default ProductControls;
