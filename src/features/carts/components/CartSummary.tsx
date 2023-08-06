import { Button } from '@/components/common/Button';
import { cartsApi } from '../api';
import { Link } from 'react-router-dom';
import { formatPrice } from '@/utils/format';

export function CartSummary() {
  const { data: cart } = cartsApi.endpoints.getCart.useQueryState();
  return (
    <section className="flex h-max w-full flex-col gap-3 justify-self-start bg-gray-100 p-3 lg:mt-3 lg:w-1/4">
      <div>
        <div className="flex justify-between">
          <span>Original price:</span>
          <span>{formatPrice(cart?.originalPrice || 0)}</span>
        </div>
        <div className="flex justify-between text-danger">
          <span>Saved:</span>
          <span>{formatPrice(cart?.totalDiscount || 0)}</span>
        </div>
      </div>
      <div className="flex justify-between text-lg font-semibold">
        <span>Order total:</span>
        <span>{formatPrice(cart?.finalPrice || 0)}</span>
      </div>
      <Button renderAs={Link} to="/checkout" fullWidth>
        Checkout
      </Button>
    </section>
  );
}
