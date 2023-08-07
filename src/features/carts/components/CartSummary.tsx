import { Button } from '@/components/common/Button';
import { cartsApi } from '../api';
import { Link } from 'react-router-dom';
import { formatPrice } from '@/utils/format';

export function CartSummary() {
  const { originalPrice, totalDiscount, finalPrice } = cartsApi.endpoints.getCart.useQueryState(
    undefined,
    {
      selectFromResult: ({ data }) => ({
        originalPrice: data?.originalPrice,
        totalDiscount: data?.totalDiscount,
        finalPrice: data?.finalPrice,
      }),
    }
  );
  return (
    <section className="sticky bottom-0 left-0 mb-8 h-max w-full justify-self-start border bg-white p-4 lg:right-0 lg:top-24 lg:w-1/4">
      <div>
        <div className="flex justify-between">
          <span>Original price:</span>
          <span>{formatPrice(originalPrice || 0)}</span>
        </div>
        <div className="flex justify-between text-danger">
          <span>Saved:</span>
          <span>{formatPrice(totalDiscount || 0)}</span>
        </div>
      </div>
      <div className="my-4 flex justify-between text-lg font-semibold">
        <span>Order total:</span>
        <span>{formatPrice(finalPrice || 0)}</span>
      </div>
      <Button renderAs={Link} to="/checkout" fullWidth>
        Checkout
      </Button>
    </section>
  );
}
