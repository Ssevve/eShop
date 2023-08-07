import { Button } from '@/components/common/Button';
import { formatPrice } from '@/utils/format';
import { Link } from 'react-router-dom';
import { cartsApi } from '../api';

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
          <span>{originalPrice ? formatPrice(originalPrice) : 'N/A'}</span>
        </div>
        <div className="flex justify-between text-danger">
          <span>Saved:</span>
          <span>{totalDiscount ? formatPrice(totalDiscount) : 'N/A'}</span>
        </div>
      </div>
      <div className="my-4 flex justify-between text-lg font-semibold">
        <span>Final price:</span>
        <span>{finalPrice ? formatPrice(finalPrice) : 'N/A'}</span>
      </div>
      <Button renderAs={Link} to="/checkout" fullWidth>
        Checkout
      </Button>
    </section>
  );
}
