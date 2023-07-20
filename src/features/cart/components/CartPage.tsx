import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { clearCart, selectCartProductCount } from '../cartSlice';
import Button from '@/components/common/Button';
import CartProductList from './CartProductList';
import CartSummary from './CartSummary';

export function CartPage() {
  const dispatch = useAppDispatch();
  const productCount = useAppSelector(selectCartProductCount);

  return (
    <section className="mx-auto mb-auto flex w-full flex-col justify-center gap-4 self-start lg:flex-row">
      <section className="w-full lg:w-3/4">
        <header className="flex items-center justify-between border-b pb-6 pt-3">
          <h1 className="text-2xl font-bold">{`Cart (${productCount})`}</h1>
          <Button variant="neutral" onClick={() => dispatch(clearCart())}>
            Clear cart
          </Button>
        </header>
        <CartProductList />
      </section>
      <CartSummary />
    </section>
  );
}
