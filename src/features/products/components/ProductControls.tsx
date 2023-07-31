import { useAppDispatch } from '@/app/hooks';
import { AmountInput } from '@/components/common/AmountInput';
import { Button } from '@/components/common/Button';
import { Product } from '@/features/products';
import { productConstraints } from '@/lib/constants';
import { useState } from 'react';

interface ProductControlsProps {
  product: Product;
}

export function ProductControls({ product }: ProductControlsProps) {
  const [amount, setAmount] = useState(productConstraints.amount.min);

  const addToCart = () => {};

  return (
    <div className="flex gap-6 xs:w-max">
      <AmountInput count={amount} setCount={setAmount} />
      <Button onClick={addToCart}>Add to cart</Button>
    </div>
  );
}
