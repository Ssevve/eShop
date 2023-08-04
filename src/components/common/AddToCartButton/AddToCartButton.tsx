import { LoaderButton } from '@/components/common/LoaderButton';
import { useAddCartProductMutation } from '@/features/carts';
import { useEffect, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';

interface AddToCartButtonProps {
  isLoading: boolean;
  cartId: string;
  productId: string;
  productName: string;
  amount: number;
}

export function AddToCartButton({
  isLoading,
  cartId,
  productId,
  productName,
  amount,
}: AddToCartButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [addToCart, { isLoading: isLoadingAddToCart, originalArgs }] = useAddCartProductMutation();

  useEffect(() => {
    if (originalArgs?.productId === productId) {
      setIsProcessing(isLoadingAddToCart || isLoading);
    }
  }, [isLoadingAddToCart, originalArgs]);

  return (
    <LoaderButton
      aria-label="Add to cart"
      textSize="lg"
      onClick={() => addToCart({ cartId, productId, productName, amount })}
      disabled={isProcessing}
      isLoading={isProcessing}
      loaderHeight={26}
      loaderWidth={28}
      className="h- w-16 p-2"
    >
      <FiShoppingCart size={20} />
    </LoaderButton>
  );
}
