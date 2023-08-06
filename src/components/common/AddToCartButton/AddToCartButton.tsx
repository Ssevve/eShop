import { LoaderButton } from '@/components/common/LoaderButton';
import { useAddCartProductMutation } from '@/features/carts';
import { useEffect, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';

interface AddToCartButtonProps {
  isFetchingCart: boolean;
  cartId: string;
  productId: string;
  productName: string;
  amount: number;
}

export function AddToCartButton({
  isFetchingCart,
  cartId,
  productId,
  productName,
  amount,
}: AddToCartButtonProps) {
  const [shouldBeDisabled, setShouldBeDisabled] = useState(false);
  const [addToCart, { isError }] = useAddCartProductMutation();

  useEffect(() => {
    setShouldBeDisabled(false);
  }, [isFetchingCart, isError]);

  const handleAddToCart = () => {
    setShouldBeDisabled(true);
    addToCart({ cartId, productId, productName, amount });
  };

  return (
    <LoaderButton
      aria-label="Add to cart"
      textSize="lg"
      onClick={handleAddToCart}
      disabled={shouldBeDisabled}
      isLoading={shouldBeDisabled}
      variant="primary"
      className="w-16 p-2"
    >
      <FiShoppingCart size={20} />
    </LoaderButton>
  );
}
