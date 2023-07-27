// import { useAppSelector } from '@/app/hooks';
import { Button } from '@/components/common/Button';
// import { selectCartDiscount, selectCartOriginalPrice, selectCartTotal } from '../cartSlice';

export function CartSummary() {
  // const originalPrice = useAppSelector(selectCartOriginalPrice);
  // const orderTotal = useAppSelector(selectCartTotal);
  // const discount = useAppSelector(selectCartDiscount);
  return (
    <section className="flex h-max w-full flex-col gap-3 justify-self-start bg-gray-100 p-3 lg:mt-3 lg:w-1/4">
      <div>
        <div className="flex justify-between">
          <span>Original price:</span>
          {/* <span>{formatPrice(originalPrice)}</span> */}
        </div>
        <div className="flex justify-between text-danger">
          <span>Saved:</span>
          {/* <span>{formatPrice(discount)}</span> */}
        </div>
      </div>
      <div className="flex justify-between text-lg font-semibold">
        <span>Order total:</span>
        {/* <span>{formatPrice(orderTotal)}</span> */}
      </div>
      <Button fullWidth>Checkout</Button>
    </section>
  );
}
