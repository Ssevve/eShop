import { AddToCartButton } from '@/components/common/AddToCartButton';
import { AmountInput } from '@/components/common/AmountInput';
import { CartProductControls } from '@/components/common/CartProductControls';
import { cartsApi } from '@/features/carts';
import { productConstraints } from '@/lib/constants';
import { useState } from 'react';
import { Product } from '../types';

interface ProductControlsProps {
  product: Product;
}

export function ProductControls({ product }: ProductControlsProps) {
  const [amount, setAmount] = useState(productConstraints.amount.min);
  const { cartId, cartProduct, isFetching } = cartsApi.endpoints.getCart.useQueryState(undefined, {
    selectFromResult: ({ data, isFetching }) => ({
      cartId: data?._id || '',
      cartProduct: data?.products.find((cartProduct) => cartProduct.product._id === product._id),
      isFetching,
    }),
  });

  return (
    <div className="flex gap-4">
      {cartProduct ? (
        <CartProductControls
          cartId={cartId}
          productId={cartProduct.product._id}
          productName={cartProduct.product.name}
          productAmount={cartProduct.amount}
          isFetchingCart={isFetching}
        />
      ) : (
        <>
          <AmountInput amount={amount} setAmount={setAmount} />
          <AddToCartButton
            cartId={cartId}
            isFetchingCart={isFetching}
            productId={product._id}
            productName={product.name}
            amount={amount}
          />
        </>
      )}
    </div>
  );
}
