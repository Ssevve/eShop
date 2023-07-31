import { Button } from '@/components/common/Button';
import { CartProductList, CartSummary } from '@/features/carts';
import { cartsApi } from '../api';

export function CartPage() {
  const { data: cart } = cartsApi.endpoints.getCart.useQueryState();
  return (
    <section className="mx-auto mb-auto flex w-full flex-col justify-center gap-4 self-start lg:flex-row">
      <section className="w-full lg:w-3/4">
        <header className="flex items-center justify-between border-b pb-6 pt-3">
          <h1 className="text-2xl font-bold">{`Cart (${cart?.products.length})`}</h1>
          <Button variant="neutral">Clear cart</Button>
        </header>
        {/* <CartProductList /> */}
      </section>
      <CartSummary />
    </section>
  );
}
